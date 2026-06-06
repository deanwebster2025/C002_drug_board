$ErrorActionPreference = "Stop"

$workspace = Split-Path -Parent $PSScriptRoot
$dataDir = Join-Path $workspace "data"
$newsPath = Join-Path $dataDir "news.json"
$sourcesPath = Join-Path $dataDir "sources.json"
$metaPath = Join-Path $dataDir "update-meta.json"

function Read-JsonFile {
  param([string]$Path)
  if (-not (Test-Path $Path)) { return $null }
  return Get-Content $Path -Raw | ConvertFrom-Json
}

function Write-JsonFile {
  param(
    [string]$Path,
    [object]$Data
  )
  $json = $Data | ConvertTo-Json -Depth 8
  [System.IO.File]::WriteAllText($Path, $json, [System.Text.Encoding]::UTF8)
}

function Normalize-Url {
  param([string]$Url)
  try {
    $uri = [System.Uri]$Url
    $path = $uri.AbsolutePath.TrimEnd("/")
    return ($uri.Scheme + "://" + $uri.Host + $path).ToLowerInvariant()
  } catch {
    return $Url.Trim().ToLowerInvariant()
  }
}

function Get-HostName {
  param([string]$Url)
  try {
    return (([System.Uri]$Url).Host.ToLowerInvariant() -replace '^www\.', '')
  } catch {
    return ""
  }
}

function Get-SourceProfile {
  param([object]$Source)

  $url = [string]$Source.url
  $mode = [string]$Source.updaterMode
  $sourceHost = Get-HostName $url
  $path = ""

  try {
    $path = ([System.Uri]$url).AbsolutePath.ToLowerInvariant()
  } catch {}

  if ($mode -eq "fda-html" -or ($sourceHost -like "*fda.gov" -and $path -like "*fda-newsroom*")) {
    return @{
      mode = "fda-html"
      feedUrl = $url
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($mode -in @("nih-html", "nih-rss") -or ($sourceHost -like "*nih.gov" -and ($path -like "*news-releases*" -or $path -like "*feed*" -or $path -like "*.xml"))) {
    return @{
      mode = "nih-html"
      feedUrl = $url
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($mode -eq "nci-html" -or ($sourceHost -like "*cancer.gov" -and $path -like "*news-events*")) {
    return @{
      mode = "nci-html"
      feedUrl = $url
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($mode -eq "astrazeneca-json" -or ($sourceHost -like "*astrazeneca.com" -and $path -like "*press-releases*")) {
    return @{
      mode = "astrazeneca-json"
      feedUrl = "https://www.astrazeneca.com/content/astraz/media-centre/press-releases/_jcr_content/par/filternew.search.json"
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($mode -eq "merck-wp-json" -or ($sourceHost -like "*merck.com" -and ($path -like "*/media/news*" -or $path -like "*/news*"))) {
    return @{
      mode = "merck-wp-json"
      feedUrl = "https://www.merck.com/wp-json/wp/v2/news_item?per_page=20"
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($mode -eq "pfizer-html" -or ($sourceHost -like "*pfizer.com" -and $path -like "*newsroom/press-releases*")) {
    return @{
      mode = "pfizer-html"
      feedUrl = "https://www.pfizer.com/newsroom/press-releases"
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($mode -eq "abbvie-html" -or ($sourceHost -like "*abbvie.com")) {
    return @{
      mode = "abbvie-html"
      feedUrl = "https://news.abbvie.com/"
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($mode -eq "roche-storyblok" -or ($sourceHost -like "*roche.com" -and $path -like "*media/releases*")) {
    return @{
      mode = "roche-storyblok"
      feedUrl = "https://api.storyblok.com/v2/cdn/stories?starts_with=media/releases/&sort_by=first_published_at:desc&per_page=30&token=9zv17miflwn4wdxnLXnfQwtt"
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($mode -eq "novartis-html" -or ($sourceHost -like "*novartis.com" -and ($path -like "*newsroom*" -or $path -like "*media-releases*"))) {
    return @{
      mode = "novartis-html"
      feedUrl = "https://www.novartis.com/news/newsroom?type=media_release"
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($mode -eq "amgen-json" -or ($sourceHost -like "*amgen.com" -and $path -like "*newsroom/press-releases*")) {
    return @{
      mode = "amgen-json"
      feedUrl = "https://www.amgen.com/MyApi/Custom/NewsListing/GetNewsReleasesV2?rootId=%7B623B9876-33FF-40EB-BDA0-8465365C59C8%7D&selectedYear=$([datetime]::UtcNow.Year)&isNasdaq=true"
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($mode -eq "gilead-search" -or ($sourceHost -like "*gilead.com" -and ($path -like "*press-releases*" -or $path -eq "/news"))) {
    return @{
      mode = "gilead-search"
      feedUrl = "https://www.gilead.com/sxa/search/results/?v=%7B2A9EDDAC-CB70-42FB-A43E-582BFD84406B%7D&s=%7B276E1983-B53E-4B38-8908-26E0B8F4DA3C%7D&l=&p=2000&sig=news&itemid=%7BA4D0C034-D2C5-4144-B486-FFAEDC2EBD77%7D"
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($mode -eq "moderna-rss" -or $sourceHost -like "*modernatx.com") {
    return @{
      mode = "rss"
      feedUrl = "https://news.modernatx.com/feed/rss2"
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($sourceHost -like "*fiercebiotech.com") {
    return @{
      mode = "rss"
      feedUrl = "https://www.fiercebiotech.com/rss/xml"
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($sourceHost -like "*biopharmadive.com") {
    return @{
      mode = "rss"
      feedUrl = "https://www.biopharmadive.com/feeds/news/"
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  if ($mode -eq "rss" -or $path -like "*rss*" -or $path -like "*feed*" -or $path -like "*.xml") {
    return @{
      mode = "rss"
      feedUrl = $url
      sourceId = [string]$Source.id
      trustScore = Get-TrustScoreValue $Source.trustScore
    }
  }

  return $null
}

function Get-TrustScoreValue {
  param([object]$Value)

  if ($Value -is [System.Array] -and $Value.Count -gt 0) {
    $Value = $Value[0]
  }

  try {
    return [int]$Value
  } catch {
    return 6
  }
}

function Get-XmlNodeText {
  param([object]$Node)

  if ($null -eq $Node) {
    return ""
  }

  if ($Node -is [string]) {
    return $Node.Trim()
  }

  if ($Node.PSObject.Properties.Name -contains "InnerText") {
    return ([string]$Node.InnerText).Trim()
  }

  return ([string]$Node).Trim()
}

function Get-TagsFromTitle {
  param([string]$Title)
  $lower = $Title.ToLowerInvariant()
  $tags = New-Object System.Collections.Generic.List[string]

  $keywordMap = @(
    @{ Pattern = "approval|approves|authorized|authorizes"; Tag = "Approval" },
    @{ Pattern = "trial|clinical"; Tag = "Trials" },
    @{ Pattern = "ai|artificial intelligence"; Tag = "AI" },
    @{ Pattern = "glp-1|obesity|metabolic"; Tag = "Metabolic disease" },
    @{ Pattern = "cancer|oncology|tumor"; Tag = "Oncology" },
    @{ Pattern = "crispr|gene"; Tag = "Gene editing" },
    @{ Pattern = "brain|cns|dementia|neuro"; Tag = "CNS" },
    @{ Pattern = "guidance|regulatory|fda|ema"; Tag = "Regulation" },
    @{ Pattern = "platform|delivery"; Tag = "Platform" }
  )

  foreach ($rule in $keywordMap) {
    if ($lower -match $rule.Pattern -and -not $tags.Contains($rule.Tag)) {
      $tags.Add($rule.Tag)
    }
  }

  if ($tags.Count -eq 0) {
    $tags.Add("Industry")
  }

  return $tags
}

function Get-Signals {
  param(
    [string]$Title,
    [int]$TrustScore,
    [datetime]$PublishedDate
  )
  $lower = $Title.ToLowerInvariant()
  $relevance = 7
  $impact = 6
  $novelty = 6

  if ($lower -match "approval|approves|authorized|authorizes|first") {
    $relevance += 2
    $impact += 3
    $novelty += 1
  }

  if ($lower -match "trial|clinical") {
    $impact += 1
  }

  if ($lower -match "ai|crispr|gene|platform|glp-1") {
    $relevance += 1
    $novelty += 1
  }

  $daysOld = [math]::Max(0, [int](([datetime]::UtcNow.Date - $PublishedDate.Date).TotalDays))
  $freshness = 10
  if ($daysOld -gt 1) { $freshness = 9 }
  if ($daysOld -gt 3) { $freshness = 8 }
  if ($daysOld -gt 7) { $freshness = 7 }
  if ($daysOld -gt 14) { $freshness = 6 }

  return @{
    drugDiscoveryRelevance = [math]::Min(10, $relevance)
    clinicalImpact = [math]::Min(10, $impact)
    novelty = [math]::Min(10, $novelty)
    freshness = $freshness
  }
}

function New-NewsItem {
  param(
    [string]$Id,
    [string]$SourceId,
    [datetime]$Date,
    [string]$Headline,
    [string]$Summary,
    [string]$Url,
    [string[]]$Tags,
    [hashtable]$Signals,
    [object]$Existing
  )

  $headlineZh = if ($Existing -and $Existing.headlineZh) { $Existing.headlineZh } else { "Chinese translation pending." }
  $summaryZh = if ($Existing -and $Existing.summaryZh) { $Existing.summaryZh } else { "Chinese translation pending." }

  return [ordered]@{
    id = $Id
    sourceId = $SourceId
    date = $Date.ToString("yyyy-MM-dd")
    headline = $Headline
    summary = $Summary
    headlineZh = $headlineZh
    summaryZh = $summaryZh
    url = $Url
    tags = $Tags
    signals = $Signals
  }
}

function Parse-PublishedDate {
  param([string]$Value)

  $trimmed = $Value.Trim()
  $formats = @(
    "ddd, MM/dd/yyyy - HH:mm",
    "ddd, dd MMM yyyy HH:mm:ss zzz",
    "yyyy-MM-ddTHH:mm:ssZ",
    "yyyy-MM-ddTHH:mm:sszzz"
  )

  foreach ($format in $formats) {
    try {
      return [datetime]::ParseExact($trimmed, $format, [System.Globalization.CultureInfo]::InvariantCulture)
    } catch {}
  }

  return Get-Date $trimmed
}

function Get-RssItems {
  param(
    [string]$FeedUrl,
    [string]$SourceId,
    [int]$TrustScore,
    [hashtable]$ExistingByUrl
  )

  $response = Invoke-WebRequest -UseBasicParsing $FeedUrl
  $xml = [xml]$response.Content
  $items = @()

  foreach ($node in $xml.rss.channel.item) {
    if (-not $node.link -or -not $node.title) { continue }
    $url = Get-XmlNodeText $node.link
    $title = [System.Net.WebUtility]::HtmlDecode((Get-XmlNodeText $node.title))
    $description = Get-XmlNodeText $node.description
    $summary = if ($description) { [System.Net.WebUtility]::HtmlDecode((($description -replace '<[^>]+>', '').Trim())) } else { "Recent source update from $SourceId." }
    $published = Parse-PublishedDate ([string]$node.pubDate)
    $normalized = Normalize-Url $url
    $existing = $ExistingByUrl[$normalized]
    $tags = Get-TagsFromTitle -Title $title
    $signals = Get-Signals -Title $title -TrustScore $TrustScore -PublishedDate $published
    $id = "story-" + ([System.Guid]::NewGuid().ToString("N").Substring(0, 8))

    $items += New-NewsItem -Id $id -SourceId $SourceId -Date $published -Headline $title.Trim() -Summary $summary -Url $url -Tags $tags -Signals $signals -Existing $existing
  }

  return $items
}

function Get-FdaItems {
  param([hashtable]$ExistingByUrl)
  $url = "https://www.fda.gov/news-events/fda-newsroom"
  $html = (Invoke-WebRequest -UseBasicParsing $url).Content
  $matches = [regex]::Matches(
    $html,
    '<a href="(?<href>/news-events/press-announcements/[^"]+)"><time datetime="(?<date>[^"]+)">[^<]+</time>\s*-\s*(?<title>[^<]+)</a>',
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
  )

  $items = @()
  foreach ($match in $matches) {
    $itemUrl = "https://www.fda.gov" + $match.Groups["href"].Value
    $title = ($match.Groups["title"].Value -replace '\s+', ' ').Trim()
    $published = Get-Date $match.Groups["date"].Value
    $normalized = Normalize-Url $itemUrl
    $existing = $ExistingByUrl[$normalized]
    $summary = "Official FDA press announcement published on $($published.ToString('MMMM d, yyyy'))."
    $tags = Get-TagsFromTitle -Title $title
    $signals = Get-Signals -Title $title -TrustScore 10 -PublishedDate $published
    $id = "story-" + ([System.Guid]::NewGuid().ToString("N").Substring(0, 8))

    $items += New-NewsItem -Id $id -SourceId "fda" -Date $published -Headline $title -Summary $summary -Url $itemUrl -Tags $tags -Signals $signals -Existing $existing
  }

  return $items
}

function Get-FdaItemsForSource {
  param(
    [object]$Source,
    [hashtable]$ExistingByUrl
  )

  $url = [string]$Source.url
  if (-not $url) {
    return @()
  }

  $html = (Invoke-WebRequest -UseBasicParsing $url).Content
  $matches = [regex]::Matches(
    $html,
    '<a href="(?<href>/news-events/press-announcements/[^"]+)"><time datetime="(?<date>[^"]+)">.*?</time>\s*-\s*(?<title>.*?)</a>',
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline
  )

  $items = @()
  foreach ($match in $matches) {
    $itemUrl = "https://www.fda.gov" + $match.Groups["href"].Value
    $title = [System.Net.WebUtility]::HtmlDecode((($match.Groups["title"].Value -replace '<[^>]+>', '') -replace '\s+', ' ').Trim())
    $published = Get-Date $match.Groups["date"].Value
    $normalized = Normalize-Url $itemUrl
    $existing = $ExistingByUrl[$normalized]
    $summary = "Official FDA press announcement published on $($published.ToString('MMMM d, yyyy'))."
    $tags = Get-TagsFromTitle -Title $title
    $signals = Get-Signals -Title $title -TrustScore (Get-TrustScoreValue $Source.trustScore) -PublishedDate $published
    $id = "story-" + ([System.Guid]::NewGuid().ToString("N").Substring(0, 8))

    $items += New-NewsItem -Id $id -SourceId ([string]$Source.id) -Date $published -Headline $title -Summary $summary -Url $itemUrl -Tags $tags -Signals $signals -Existing $existing
  }

  return $items
}

function Get-NihItemsForSource {
  param(
    [object]$Source,
    [hashtable]$ExistingByUrl
  )

  $sourceUrl = [string]$Source.url
  if (-not $sourceUrl) {
    return @()
  }

  # NIH rejects requests from the Windows GitHub runner, so use a text-only
  # rendering service while preserving NIH as the source and destination.
  $proxyUrl = "https://r.jina.ai/http://www.nih.gov/news-events/news-releases"
  $content = (Invoke-WebRequest -UseBasicParsing $proxyUrl).Content
  $matches = [regex]::Matches(
    $content,
    '###\s*(?<content>.*?)\]\((?<url>https://www\.nih\.gov/news-events/news-releases/[^)]+)\)',
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline
  )

  $items = @()
  foreach ($match in $matches) {
    $entry = (($match.Groups["content"].Value -replace '\s+', ' ').Trim())
    $parts = [regex]::Match(
      $entry,
      '^(?<title>.+?)\s+(?<date>[A-Za-z]+\s+\d{1,2},\s+\d{4})\s+\S+\s+(?<summary>.+)$'
    )
    if (-not $parts.Success) {
      continue
    }

    $itemUrl = $match.Groups["url"].Value
    $title = [System.Net.WebUtility]::HtmlDecode($parts.Groups["title"].Value.Trim())
    $summary = [System.Net.WebUtility]::HtmlDecode($parts.Groups["summary"].Value.Trim())
    $published = Get-Date $parts.Groups["date"].Value
    $normalized = Normalize-Url $itemUrl
    $existing = $ExistingByUrl[$normalized]
    $tags = Get-TagsFromTitle -Title $title
    $signals = Get-Signals -Title $title -TrustScore (Get-TrustScoreValue $Source.trustScore) -PublishedDate $published
    $id = "story-" + ([System.Guid]::NewGuid().ToString("N").Substring(0, 8))

    $items += New-NewsItem -Id $id -SourceId ([string]$Source.id) -Date $published -Headline $title -Summary $summary -Url $itemUrl -Tags $tags -Signals $signals -Existing $existing
  }

  return $items
}

function Get-NciItemsForSource {
  param(
    [object]$Source,
    [hashtable]$ExistingByUrl
  )

  $url = [string]$Source.url
  if (-not $url) {
    return @()
  }

  $html = (Invoke-WebRequest -UseBasicParsing $url).Content
  $matches = [regex]::Matches(
    $html,
    '<h3>\s*<a[^>]+href="(?<href>[^"]+)">(?<title>[^<]+)</a>\s*</h3>\s*<ul>\s*<li>\s*(?<date>[A-Za-z]+\s+\d{1,2},\s+\d{4})\s*</li>\s*</ul>\s*(?<summary>.*?)\s*(?=<ul>\s*<li>\s*<img|<p><a href=|$)',
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline
  )

  $items = @()
  foreach ($match in $matches) {
    $href = $match.Groups["href"].Value
    if (-not $href) { continue }

    $itemUrl = if ($href.StartsWith("http")) { $href } else { "https://www.cancer.gov" + $href }
    $title = [System.Net.WebUtility]::HtmlDecode(($match.Groups["title"].Value -replace '\s+', ' ').Trim())
    $summary = [System.Net.WebUtility]::HtmlDecode((($match.Groups["summary"].Value -replace '<[^>]+>', ' ') -replace '\s+', ' ').Trim())
    $published = Get-Date $match.Groups["date"].Value
    $normalized = Normalize-Url $itemUrl
    $existing = $ExistingByUrl[$normalized]
    $tags = Get-TagsFromTitle -Title $title
    if (-not $tags.Contains("Oncology")) {
      $tags.Add("Oncology")
    }
    $signals = Get-Signals -Title $title -TrustScore (Get-TrustScoreValue $Source.trustScore) -PublishedDate $published
    $id = "story-" + ([System.Guid]::NewGuid().ToString("N").Substring(0, 8))

    $items += New-NewsItem -Id $id -SourceId ([string]$Source.id) -Date $published -Headline $title -Summary $summary -Url $itemUrl -Tags $tags -Signals $signals -Existing $existing
  }

  return $items
}

function Get-AstraZenecaItemsForSource {
  param(
    [object]$Source,
    [hashtable]$ExistingByUrl
  )

  $feedUrl = "https://www.astrazeneca.com/content/astraz/media-centre/press-releases/_jcr_content/par/filternew.search.json"
  $entries = Invoke-WebRequest -UseBasicParsing $feedUrl | Select-Object -ExpandProperty Content | ConvertFrom-Json
  $items = @()

  foreach ($entry in $entries) {
    if (-not $entry.link -or -not $entry.title -or -not $entry.dateTime) { continue }

    $itemUrl = if ([string]$entry.link -match '^https?://') { [string]$entry.link } else { "https://www.astrazeneca.com" + [string]$entry.link.Replace("/content/astraz", "") }
    $title = [System.Net.WebUtility]::HtmlDecode(([string]$entry.title).Trim())
    $published = Get-Date ([string]$entry.dateTime)
    $normalized = Normalize-Url $itemUrl
    $existing = $ExistingByUrl[$normalized]

    $tagTitles = @()
    if ($entry.tag) {
      $tagTitles = @($entry.tag | ForEach-Object { [string]$_.title } | Where-Object { $_ })
    }

    $tags = New-Object System.Collections.Generic.List[string]
    foreach ($tag in @(Get-TagsFromTitle -Title $title)) {
      if ($tag -and -not $tags.Contains([string]$tag)) {
        $tags.Add([string]$tag)
      }
    }
    foreach ($tagTitle in $tagTitles) {
      if (-not $tags.Contains($tagTitle)) {
        $tags.Add($tagTitle)
      }
    }

    $summary = if ($tagTitles.Count) {
      "AstraZeneca press release covering " + (($tagTitles | Select-Object -First 3) -join ", ").ToLowerInvariant() + "."
    } else {
      "AstraZeneca press release update on pipeline, trial, approval, or corporate developments."
    }

    $signals = Get-Signals -Title $title -TrustScore (Get-TrustScoreValue $Source.trustScore) -PublishedDate $published
    $id = "story-" + ([System.Guid]::NewGuid().ToString("N").Substring(0, 8))

    $items += New-NewsItem -Id $id -SourceId ([string]$Source.id) -Date $published -Headline $title -Summary $summary -Url $itemUrl -Tags $tags -Signals $signals -Existing $existing
  }

  return $items
}

function Get-MerckItemsForSource {
  param(
    [object]$Source,
    [hashtable]$ExistingByUrl
  )

  $feedUrl = "https://www.merck.com/wp-json/wp/v2/news_item?per_page=20"
  $entries = Invoke-WebRequest -UseBasicParsing $feedUrl | Select-Object -ExpandProperty Content | ConvertFrom-Json
  $items = @()

  foreach ($entry in @($entries)) {
    if (-not $entry.link -or -not $entry.title.rendered -or -not $entry.date) { continue }

    $itemUrl = [string]$entry.link
    $title = [System.Net.WebUtility]::HtmlDecode(([string]$entry.title.rendered -replace '<[^>]+>', '').Trim())
    $summaryValue = [string]$entry.excerpt.rendered
    $summary = if ($summaryValue.Trim()) {
      [System.Net.WebUtility]::HtmlDecode((($summaryValue -replace '<[^>]+>', ' ') -replace '\s+', ' ').Trim())
    } else {
      "Merck & Co. media release covering pipeline, trial, approval, research, or corporate developments."
    }
    $published = Get-Date ([string]$entry.date)
    $normalized = Normalize-Url $itemUrl
    $existing = $ExistingByUrl[$normalized]
    $tags = Get-TagsFromTitle -Title $title
    $signals = Get-Signals -Title $title -TrustScore (Get-TrustScoreValue $Source.trustScore) -PublishedDate $published
    $id = "story-" + ([System.Guid]::NewGuid().ToString("N").Substring(0, 8))

    $items += New-NewsItem -Id $id -SourceId ([string]$Source.id) -Date $published -Headline $title -Summary $summary -Url $itemUrl -Tags $tags -Signals $signals -Existing $existing
  }

  return $items
}

function Get-PfizerItemsForSource {
  param(
    [object]$Source,
    [hashtable]$ExistingByUrl
  )

  $html = (Invoke-WebRequest -UseBasicParsing "https://www.pfizer.com/newsroom/press-releases").Content
  $matches = [regex]::Matches(
    $html,
    '<p class="date">\s*(?<date>\d{2}\.\d{2}\.\d{4})\s*</p></div><div class="cell[^"]*"><h5><a href="(?<href>[^"]+)"[^>]*>(?<title>.*?)</a>',
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline
  )

  $items = @()
  foreach ($match in $matches) {
    $href = [string]$match.Groups["href"].Value
    $itemUrl = if ($href -match '^https?://') { $href } else { "https://www.pfizer.com" + $href }
    $title = [System.Net.WebUtility]::HtmlDecode((($match.Groups["title"].Value -replace '<[^>]+>', ' ') -replace '\s+', ' ').Trim())
    if (-not $title) { continue }
    $published = [datetime]::ParseExact([string]$match.Groups["date"].Value, "MM.dd.yyyy", [System.Globalization.CultureInfo]::InvariantCulture)
    $normalized = Normalize-Url $itemUrl
    $existing = $ExistingByUrl[$normalized]
    $summary = "Official Pfizer press release on pipeline, regulatory, research, or corporate developments."
    $tags = Get-TagsFromTitle -Title $title
    $signals = Get-Signals -Title $title -TrustScore (Get-TrustScoreValue $Source.trustScore) -PublishedDate $published
    $id = "story-" + ([System.Guid]::NewGuid().ToString("N").Substring(0, 8))

    $items += New-NewsItem -Id $id -SourceId ([string]$Source.id) -Date $published -Headline $title -Summary $summary -Url $itemUrl -Tags $tags -Signals $signals -Existing $existing
  }

  return $items
}

function Get-AbbVieItemsForSource {
  param(
    [object]$Source,
    [hashtable]$ExistingByUrl
  )

  $html = (Invoke-WebRequest -UseBasicParsing "https://news.abbvie.com/").Content
  $matches = [regex]::Matches(
    $html,
    '<div class="wd_date">(?<date>[A-Za-z]+\s+\d{1,2},\s+\d{4})</div>\s*<div class="wd_title"><a href="(?<href>[^"]+)">(?<title>.*?)</a>',
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline
  )

  $items = @()
  foreach ($match in $matches) {
    $itemUrl = [string]$match.Groups["href"].Value
    $title = [System.Net.WebUtility]::HtmlDecode((($match.Groups["title"].Value -replace '<[^>]+>', ' ') -replace '\s+', ' ').Trim())
    if (-not $title) { continue }
    $published = Get-Date ([string]$match.Groups["date"].Value)
    $normalized = Normalize-Url $itemUrl
    $existing = $ExistingByUrl[$normalized]
    $summary = "Official AbbVie newsroom release on pipeline, regulatory, research, or corporate developments."
    $tags = Get-TagsFromTitle -Title $title
    $signals = Get-Signals -Title $title -TrustScore (Get-TrustScoreValue $Source.trustScore) -PublishedDate $published
    $id = "story-" + ([System.Guid]::NewGuid().ToString("N").Substring(0, 8))

    $items += New-NewsItem -Id $id -SourceId ([string]$Source.id) -Date $published -Headline $title -Summary $summary -Url $itemUrl -Tags $tags -Signals $signals -Existing $existing
  }

  return $items
}

function Get-NovartisItemsForSource {
  param(
    [object]$Source,
    [hashtable]$ExistingByUrl
  )

  $html = (Invoke-WebRequest -UseBasicParsing "https://www.novartis.com/news/newsroom?type=media_release").Content
  $matches = [regex]::Matches(
    $html,
    '<a href="(?<href>[^"]+)"[^>]*>\s*Press release\s+(?<date>[A-Za-z]{3}\s+\d{2},\s+\d{4})\s+(?<title>.*?)</a>',
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline
  )

  $items = @()
  foreach ($match in $matches) {
    $href = [string]$match.Groups["href"].Value
    $itemUrl = if ($href -match '^https?://') { $href } else { "https://www.novartis.com" + $href }
    $title = [System.Net.WebUtility]::HtmlDecode((($match.Groups["title"].Value -replace '<[^>]+>', ' ') -replace '\s+', ' ').Trim())
    if (-not $title) { continue }
    $published = Get-Date ([string]$match.Groups["date"].Value)
    $normalized = Normalize-Url $itemUrl
    $existing = $ExistingByUrl[$normalized]
    $summary = "Official Novartis media release on pipeline, regulatory, research, manufacturing, or corporate developments."
    $tags = Get-TagsFromTitle -Title $title
    $signals = Get-Signals -Title $title -TrustScore (Get-TrustScoreValue $Source.trustScore) -PublishedDate $published
    $id = "story-" + ([System.Guid]::NewGuid().ToString("N").Substring(0, 8))

    $items += New-NewsItem -Id $id -SourceId ([string]$Source.id) -Date $published -Headline $title -Summary $summary -Url $itemUrl -Tags $tags -Signals $signals -Existing $existing
  }

  return $items
}

function Get-AmgenItemsForSource {
  param(
    [object]$Source,
    [hashtable]$ExistingByUrl
  )

  $year = [datetime]::UtcNow.Year
  $feedUrl = "https://www.amgen.com/MyApi/Custom/NewsListing/GetNewsReleasesV2?rootId=%7B623B9876-33FF-40EB-BDA0-8465365C59C8%7D&selectedYear=$year&isNasdaq=true"
  $response = Invoke-WebRequest -UseBasicParsing $feedUrl | Select-Object -ExpandProperty Content | ConvertFrom-Json
  $items = @()

  foreach ($monthGroup in @($response)) {
    foreach ($entry in @($monthGroup.NewsReleases)) {
      if (-not $entry.Title -or -not $entry.Date -or -not $entry.Url) { continue }

      $href = [string]$entry.Url
      $itemUrl = if ($href -match '^https?://') { $href } else { "https://www.amgen.com" + $href }
      $title = [System.Net.WebUtility]::HtmlDecode(([string]$entry.Title).Trim())
      if (-not $title) { continue }
      $published = [datetime]::ParseExact([string]$entry.Date, "MM.dd.yyyy", [System.Globalization.CultureInfo]::InvariantCulture)
      $normalized = Normalize-Url $itemUrl
      $existing = $ExistingByUrl[$normalized]
      $summary = "Official Amgen press release on pipeline, regulatory, research, manufacturing, or corporate developments."
      $tags = Get-TagsFromTitle -Title $title
      $signals = Get-Signals -Title $title -TrustScore (Get-TrustScoreValue $Source.trustScore) -PublishedDate $published
      $id = "story-" + ([System.Guid]::NewGuid().ToString("N").Substring(0, 8))

      $items += New-NewsItem -Id $id -SourceId ([string]$Source.id) -Date $published -Headline $title -Summary $summary -Url $itemUrl -Tags $tags -Signals $signals -Existing $existing
    }
  }

  return $items
}

function Get-GileadItemsForSource {
  param(
    [object]$Source,
    [hashtable]$ExistingByUrl
  )

  $feedUrl = "https://www.gilead.com/sxa/search/results/?v=%7B2A9EDDAC-CB70-42FB-A43E-582BFD84406B%7D&s=%7B276E1983-B53E-4B38-8908-26E0B8F4DA3C%7D&l=&p=2000&sig=news&itemid=%7BA4D0C034-D2C5-4144-B486-FFAEDC2EBD77%7D"
  $response = Invoke-WebRequest -UseBasicParsing $feedUrl | Select-Object -ExpandProperty Content | ConvertFrom-Json
  $items = @()

  foreach ($entry in @($response.Results)) {
    if (-not $entry.Url -or -not $entry.Html) { continue }

    $itemUrl = if ([string]$entry.Url -match '^https?://') { [string]$entry.Url } else { "https://www.gilead.com" + [string]$entry.Url }
    $dateMatch = [regex]::Match([string]$entry.Html, '<div class=\"gl-notes-date field-news-date\">(?<date>[^<]+)</div>', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    $titleMatch = [regex]::Match([string]$entry.Html, '<h5>\s*(?<title>.*?)\s*</h5>', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if (-not $dateMatch.Success -or -not $titleMatch.Success) { continue }

    $title = [System.Net.WebUtility]::HtmlDecode((($titleMatch.Groups["title"].Value -replace '<[^>]+>', ' ') -replace '\s+', ' ').Trim())
    if (-not $title) { continue }

    $published = Get-Date ([string]$dateMatch.Groups["date"].Value)
    $normalized = Normalize-Url $itemUrl
    $existing = $ExistingByUrl[$normalized]
    $summary = "Official Gilead newsroom release on virology, oncology, cell therapy, research, or corporate developments."
    $tags = Get-TagsFromTitle -Title $title
    $signals = Get-Signals -Title $title -TrustScore (Get-TrustScoreValue $Source.trustScore) -PublishedDate $published
    $id = "story-" + ([System.Guid]::NewGuid().ToString("N").Substring(0, 8))

    $items += New-NewsItem -Id $id -SourceId ([string]$Source.id) -Date $published -Headline $title -Summary $summary -Url $itemUrl -Tags $tags -Signals $signals -Existing $existing
  }

  return $items
}

function Get-RocheItemsForSource {
  param(
    [object]$Source,
    [hashtable]$ExistingByUrl
  )

  $feedUrl = "https://api.storyblok.com/v2/cdn/stories?starts_with=media/releases/&sort_by=first_published_at:desc&per_page=30&token=9zv17miflwn4wdxnLXnfQwtt"
  $response = Invoke-WebRequest -UseBasicParsing $feedUrl | Select-Object -ExpandProperty Content | ConvertFrom-Json
  $items = @()

  foreach ($story in @($response.stories)) {
    if (-not $story.full_slug) { continue }

    $itemUrl = "https://www.roche.com/" + ([string]$story.full_slug).TrimStart("/")
    $metaTags = $story.content.meta_tags

    $titleValue = ""
    if ($metaTags -and $metaTags.title) {
      $titleValue = [string]$metaTags.title
    } elseif ($story.content.teaser_title) {
      $titleValue = [string]$story.content.teaser_title
    } else {
      $titleValue = [string]$story.name
    }

    $title = [System.Net.WebUtility]::HtmlDecode($titleValue.Trim())
    if (-not $title) { continue }

    $summaryValue = ""
    if ($metaTags -and $metaTags.description) {
      $summaryValue = [string]$metaTags.description
    } elseif ($story.content.teaser_description) {
      $summaryValue = [string]$story.content.teaser_description
    }

    $summary = if ($summaryValue.Trim()) {
      [System.Net.WebUtility]::HtmlDecode($summaryValue.Trim())
    } else {
      "Roche media release covering pipeline, trial, approval, or corporate developments."
    }

    $published = Get-Date ([string]$story.first_published_at)
    $normalized = Normalize-Url $itemUrl
    $existing = $ExistingByUrl[$normalized]
    $tags = Get-TagsFromTitle -Title $title
    $signals = Get-Signals -Title $title -TrustScore (Get-TrustScoreValue $Source.trustScore) -PublishedDate $published
    $id = "story-" + ([System.Guid]::NewGuid().ToString("N").Substring(0, 8))

    $items += New-NewsItem -Id $id -SourceId ([string]$Source.id) -Date $published -Headline $title -Summary $summary -Url $itemUrl -Tags $tags -Signals $signals -Existing $existing
  }

  return $items
}

$existingNews = Read-JsonFile -Path $newsPath
if ($existingNews -isnot [System.Array]) {
  $existingNews = @($existingNews)
}

$savedSources = Read-JsonFile -Path $sourcesPath
if ($savedSources -isnot [System.Array]) {
  $savedSources = @($savedSources)
}
$existingByUrl = @{}
foreach ($item in $existingNews) {
  $existingByUrl[(Normalize-Url $item.url)] = $item
}

$freshItems = @()
$usedSourceIds = New-Object System.Collections.Generic.List[string]
$failedSourceIds = New-Object System.Collections.Generic.HashSet[string]

foreach ($source in $savedSources) {
  $profile = Get-SourceProfile $source
  if ($null -eq $profile) {
    continue
  }

  try {
    $sourceItems = @()
    switch ($profile.mode) {
      "fda-html" {
        $sourceItems = @(Get-FdaItemsForSource -Source $source -ExistingByUrl $existingByUrl)
      }
      "nih-html" {
        $sourceItems = @(Get-NihItemsForSource -Source $source -ExistingByUrl $existingByUrl)
      }
      "nci-html" {
        $sourceItems = @(Get-NciItemsForSource -Source $source -ExistingByUrl $existingByUrl)
      }
      "astrazeneca-json" {
        $sourceItems = @(Get-AstraZenecaItemsForSource -Source $source -ExistingByUrl $existingByUrl)
      }
      "merck-wp-json" {
        $sourceItems = @(Get-MerckItemsForSource -Source $source -ExistingByUrl $existingByUrl)
      }
      "pfizer-html" {
        $sourceItems = @(Get-PfizerItemsForSource -Source $source -ExistingByUrl $existingByUrl)
      }
      "abbvie-html" {
        $sourceItems = @(Get-AbbVieItemsForSource -Source $source -ExistingByUrl $existingByUrl)
      }
      "roche-storyblok" {
        $sourceItems = @(Get-RocheItemsForSource -Source $source -ExistingByUrl $existingByUrl)
      }
      "novartis-html" {
        $sourceItems = @(Get-NovartisItemsForSource -Source $source -ExistingByUrl $existingByUrl)
      }
      "amgen-json" {
        $sourceItems = @(Get-AmgenItemsForSource -Source $source -ExistingByUrl $existingByUrl)
      }
      "gilead-search" {
        $sourceItems = @(Get-GileadItemsForSource -Source $source -ExistingByUrl $existingByUrl)
      }
      "rss" {
        $sourceItems = @(Get-RssItems -FeedUrl $profile.feedUrl -SourceId $profile.sourceId -TrustScore $profile.trustScore -ExistingByUrl $existingByUrl)
      }
    }

    if ($sourceItems.Count -eq 0) {
      throw "Collector returned no items."
    }

    $freshItems += $sourceItems
    $usedSourceIds.Add([string]$source.id)
  } catch {
    $failedSourceIds.Add([string]$source.id) | Out-Null
    Write-Warning "Keeping existing stories for $($source.name): $($_.Exception.Message)"
  }
}

foreach ($item in $existingNews) {
  if ($failedSourceIds.Contains([string]$item.sourceId)) {
    $freshItems += $item
  }
}

$deduped = @{}
foreach ($item in $freshItems) {
  $key = Normalize-Url $item.url
  if (-not $deduped.ContainsKey($key)) {
    $deduped[$key] = $item
  }
}

$finalItems = $deduped.Values | Sort-Object {[datetime]$_.date} -Descending
Write-JsonFile -Path $newsPath -Data @($finalItems)

$meta = [ordered]@{
  lastUpdatedUtc = [datetime]::UtcNow.ToString("o")
  sourceCount = @($usedSourceIds).Count
  itemCount = @($finalItems).Count
  sourcesUsed = @($usedSourceIds)
}

Write-JsonFile -Path $metaPath -Data $meta
$sourceSummary = ($meta.sourcesUsed -join ", ")
Write-Output "Updated $($meta.itemCount) news items from $sourceSummary on $($meta.lastUpdatedUtc)"
