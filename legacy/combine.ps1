$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

$sections = @(
  @{ file = 'index2.html';  sec = 'km2';  overrides = @(
       '.network-hero { background: transparent !important; }',
       '.bg-map, .nebula-blob, .comet-svg { display: none !important; }' ) },
  @{ file = 'index3.html';  sec = 'km3';  overrides = @(
       '.km3-hero { background: transparent !important; }',
       '.km3-hero::before { display: none !important; }' ) },
  @{ file = 'index4.html';  sec = 'km4';  overrides = @(
       '.cid-section { background: transparent !important; }',
       '.cid-section::before { display: none !important; }' ) },
  @{ file = 'index6.html';  sec = 'km6';  overrides = @( '.details-section { background: transparent !important; }' ) },
  @{ file = 'index5.html';  sec = 'km5';  overrides = @( ) },
  @{ file = 'index7.html';  sec = 'km7';  overrides = @( '.cid-wrapper { background: transparent !important; }' ) },
  @{ file = 'index8.html';  sec = 'km8';  overrides = @( '.royalty-section { background: transparent !important; }' ) },
  @{ file = 'index9.html';  sec = 'km9';  overrides = @(
       '.hero { background: transparent !important; }',
       '.bg-glow-1, .bg-glow-2 { display: none !important; }' ) },
  @{ file = 'index10.html'; sec = 'km10'; overrides = @(
       '.karhari { background: transparent !important; }',
       '.hero-backdrop { display: none !important; }' ) }
)

$tagNames = 'html body head title meta link style script div span p a img ul ol li h1 h2 h3 h4 h5 h6 header nav main section article aside footer button input label select option textarea form table thead tbody tfoot tr td th caption col colgroup svg g path circle rect line polyline polygon ellipse text tspan stop defs linearGradient radialGradient pattern marker mask use symbol view clipPath filter feGaussianBlur animate animateTransform animateMotion br hr strong em b i small u sup sub code pre blockquote q cite figure figcaption iframe video audio source track canvas dl dt dd summary details time wbr area map object embed noscript output progress meter datalist fieldset legend optgroup address abbr bdi bdo data dialog picture portal rp rt ruby s samp search template'.Split(' ')

function Get-ClassNames([string]$text) {
  $set = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
  foreach ($m in [regex]::Matches($text, '(?<=[\s{,>+~:(])\.([a-zA-Z][\w-]*)')) { [void]$set.Add($m.Groups[1].Value) }
  foreach ($m in [regex]::Matches($text, 'class="([^"]*)"')) {
    foreach ($t in $m.Groups[1].Value.Split(@(' '), [StringSplitOptions]::RemoveEmptyEntries)) {
      if ($t -match '^[a-zA-Z][\w-]*$') { [void]$set.Add($t) }
    }
  }
  return ,$set
}

function Convert-Css([string]$css, [string]$sec, [string[]]$collision) {
  $css = $css.Replace(':root', ".$sec-section")
  if ($collision -and $collision.Count -gt 0) {
    $pat = '(?<=[\s{,>+~:(])\.(' + (($collision | ForEach-Object { [regex]::Escape($_) }) -join '|') + ')(?![\w-])'
    $css = [regex]::Replace($css, $pat, { param($m) '.' + $sec + '-' + $m.Groups[1].Value })
  }
  $css = [regex]::Replace($css, '#([a-zA-Z][\w-]*)', {
    param($m)
    $n = $m.Groups[1].Value
    if ($n -match '^[0-9a-fA-F]{3}$' -or $n -match '^[0-9a-fA-F]{4}$' -or $n -match '^[0-9a-fA-F]{6}$' -or $n -match '^[0-9a-fA-F]{8}$') { return $m.Value }
    return '#' + $sec + '-' + $n
  })
  return $css
}

function Convert-Html([string]$html, [string]$sec, [string[]]$collision) {
  $html = [regex]::Replace($html, '\bid="([^"]+)"', { param($m) 'id="' + $sec + '-' + $m.Groups[1].Value + '"' })
  $html = [regex]::Replace($html, 'url\(\s*#([a-zA-Z][\w-]*)', { param($m) 'url(#' + $sec + '-' + $m.Groups[1].Value })
  $html = [regex]::Replace($html, '\bhref="#([a-zA-Z][\w-]*)"', { param($m) 'href="#' + $sec + '-' + $m.Groups[1].Value + '"' })
  if ($collision -and $collision.Count -gt 0) {
    $pat = '(?<![a-zA-Z0-9_-])(' + (($collision | ForEach-Object { [regex]::Escape($_) }) -join '|') + ')(?![a-zA-Z0-9_-])'
    $html = [regex]::Replace($html, 'class="([^"]*)"', { param($m)
        $inner = [regex]::Replace($m.Groups[1].Value, $pat, { param($t) $sec + '-' + $t.Groups[1].Value })
        'class="' + $inner + '"'
      })
  }
  return $html
}

function Convert-Js([string]$js, [string]$sec, [string[]]$collision) {
  $js = [regex]::Replace($js, "getElementById\(\s*'([^']+)'\s*\)", { param($m) "getElementById('" + $sec + '-' + $m.Groups[1].Value + "')" })
  $js = [regex]::Replace($js, 'getElementById\(\s*"([^"]+)"\s*\)', { param($m) "getElementById('" + $sec + '-' + $m.Groups[1].Value + "')" })
  $js = [regex]::Replace($js, "(['""])(#[a-zA-Z][\w-]*)", { param($m)
      $n = $m.Groups[2].Value.Substring(1)
      if ($n -match '^[0-9a-fA-F]{3}$' -or $n -match '^[0-9a-fA-F]{4}$' -or $n -match '^[0-9a-fA-F]{6}$' -or $n -match '^[0-9a-fA-F]{8}$') { return $m.Value }
      return $m.Groups[1].Value + '#' + $sec + '-' + $n
    })
  $js = [regex]::Replace($js, "(['""])(\.)([a-zA-Z][\w-]*)", { param($m) $m.Groups[1].Value + '.' + $sec + '-section .' + $m.Groups[3].Value })
  $js = [regex]::Replace($js, '(?<!document\.)querySelector(All)?\(\s*([\x27\x22])(\.km\d+-section\s+\.)', { param($m) 'querySelector' + $m.Groups[1].Value + '(' + $m.Groups[2].Value + '.' })
  if ($collision -and $collision.Count -gt 0) {
    $pat = '(?<![\w-])\.(' + (($collision | ForEach-Object { [regex]::Escape($_) }) -join '|') + ')(?![\w-])'
    $js = [regex]::Replace($js, $pat, { param($m) '.' + $sec + '-' + $m.Groups[1].Value })
    $pat2 = "(['\x22])(" + (($collision | ForEach-Object { [regex]::Escape($_) }) -join '|') + ")(['\x22])"
    $js = [regex]::Replace($js, $pat2, { param($m) $m.Groups[1].Value + $sec + '-' + $m.Groups[2].Value + $m.Groups[3].Value })
  }
  return $js
}

function Get-Parts([string]$raw) {
  $styles = @([regex]::Matches($raw, '<style[^>]*>([\s\S]*?)</style>') | ForEach-Object { $_.Groups[1].Value })
  $scripts = @([regex]::Matches($raw, '<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)</script>') | ForEach-Object { $_.Groups[1].Value })
  $body = ''
  $bm = [regex]::Match($raw, '<body[^>]*>([\s\S]*?)</body>')
  if ($bm.Success) { $body = $bm.Groups[1].Value }
  $body = [regex]::Replace($body, '<script[^>]*>[\s\S]*?</script>', '')
  return @{ styles = $styles; scripts = $scripts; body = $body }
}

function Read-Utf8([string]$path) {
  return [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
}

# ---------- global class name set (style.css + km1 inline styles + km1 body) ----------
$cssGlobal = Read-Utf8 (Join-Path $root 'css\style.css')
$km1raw = Read-Utf8 (Join-Path $root 'index.html')
$mainJs = Read-Utf8 (Join-Path $root 'js\main.js')

$sSet = Get-ClassNames $cssGlobal
foreach ($m in [regex]::Matches($km1raw, '<style[^>]*>([\s\S]*?)</style>')) {
  foreach ($n in @(Get-ClassNames $m.Groups[1].Value)) { [void]$sSet.Add($n) }
}
foreach ($n in @(Get-ClassNames $km1raw)) { [void]$sSet.Add($n) }
foreach ($t in $tagNames) { [void]$sSet.Remove($t) }

# ---------- km1 parts ----------
$km1parts = Get-Parts $km1raw
$globalStyles = @($cssGlobal) + @($km1parts.styles)

# ---------- per-section processing ----------
$scopedCss = @()
$bodyParts = @()
$scriptParts = @()

foreach ($s in $sections) {
  $file = Join-Path $root $s.file
  $sec = $s.sec
  $raw = Read-Utf8 $file
  $parts = Get-Parts $raw

  $uSet = Get-ClassNames $parts.body
  foreach ($st in $parts.styles) { foreach ($n in @(Get-ClassNames $st)) { [void]$uSet.Add($n) } }
  foreach ($t in $tagNames) { [void]$uSet.Remove($t) }

  $collision = @($uSet | Where-Object { $sSet.Contains($_) } | Sort-Object)

  $secCss = ($parts.styles | ForEach-Object { Convert-Css $_ $sec $collision }) -join "`n"
  $overrides = ($s.overrides | ForEach-Object { Convert-Css $_ $sec $collision }) -join "`n"
  $scopedCss += "`n/* ==================== SECTION: $($s.file) ($sec) ==================== */`n@scope (.$sec-section) {`n" + $secCss + "`n" + $overrides + "`n}"

  $bodyHtml = (Convert-Html $parts.body $sec $collision)
  $bodyParts += "`n`n<!-- ==================== SECTION: $($s.file) ($sec) ==================== -->`n<div class=""$sec-section"">" + $bodyHtml + "</div>"

  $secJs = ($parts.scripts | ForEach-Object { Convert-Js $_ $sec $collision }) -join "`n"
  if ($secJs.Trim()) {
    $scriptParts += "`n/* ==================== $($s.file) ($sec) scripts ==================== */`n(function () {`ntry {`n" + $secJs + "`n} catch (err) {`n  console.error('[$sec] section script error:', err);`n}`n})();"
  }

  Write-Host "[$sec] collisions: $($collision -join ', ')" -ForegroundColor DarkGray
}

# ---------- assemble ----------
$head = @'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Karhari Media - Global Music Distribution</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&family=Poppins:wght@400;500;600;700;800;900&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet">
<link rel="preload" as="image" href="hero-vinyl.png">
<style>
'@

$styleBlock = $globalStyles[0] + "`n/* ============ index.html inline styles ============ */`n" + $globalStyles[1]

$htmlBody = $km1parts.body
$htmlBody += ($bodyParts -join '')
$htmlBody += "`n"

$scriptBlock = @"
/* ==================== js/main.js (km1) ==================== */
$mainJs
$($scriptParts -join '')
"@

$tail = @'
</script>
</body>
</html>
'@

$full = $head + "`n" + $styleBlock + "`n" + ($scopedCss -join "`n") + "`n</style>`n</head>`n<body>" + $htmlBody + @"

<!-- ==================== SCRIPTS ==================== -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js"></script>
<script>
$scriptBlock
"@ + $tail

$out = Join-Path $root 'combined.html'
[System.IO.File]::WriteAllText($out, $full, (New-Object System.Text.UTF8Encoding($false)))

Write-Host "Wrote $out ($([math]::Round((Get-Item $out).Length / 1KB)) KB)"

# ---------- validation ----------
$c = Get-Content $out -Raw
$ids = @([regex]::Matches($c, '\bid="([^"]+)"') | ForEach-Object { $_.Groups[1].Value })
$dupIds = $ids | Group-Object | Where-Object { $_.Count -gt 1 } | ForEach-Object { $_.Name }
Write-Host "Duplicate IDs: $($dupIds.Count)" -ForegroundColor $(if ($dupIds.Count) { 'Red' } else { 'Green' })

$idSet = [System.Collections.Generic.HashSet[string]]::new()
foreach ($i in $ids) { [void]$idSet.Add($i) }
$refs = @([regex]::Matches($c, "getElementById\('([^']+)'\)") | ForEach-Object { $_.Groups[1].Value }) | Sort-Object -Unique
$missing = @($refs | Where-Object { -not $idSet.Contains($_) })
Write-Host "getElementById refs missing: $($missing.Count) $($missing -join ', ')" -ForegroundColor $(if ($missing.Count) { 'Yellow' } else { 'Green' })

$indirect = @([regex]::Matches($c, "getElementById\(\s*(?![`'\x22`)])([a-zA-Z_$][\w$]*|`$?\{)") | ForEach-Object { $_.Groups[1].Value }) | Sort-Object -Unique
if ($indirect.Count) { Write-Host "INDIRECT getElementById args (NOT auto-prefixed - verify id prefixes!): $($indirect -join ', ')" -ForegroundColor Yellow }

$scopeCount = @([regex]::Matches($c, '@scope \(\.km\d+-section\)')).Count
Write-Host "@scope blocks: $scopeCount (expect 9)" -ForegroundColor $(if ($scopeCount -eq 9) { 'Green' } else { 'Yellow' })

$wrapCount = @([regex]::Matches($c, 'class="km\d+-section"')).Count
Write-Host "kmX-section wrappers: $wrapCount (expect 9)" -ForegroundColor $(if ($wrapCount -eq 9) { 'Green' } else { 'Yellow' })

$anchors = @([regex]::Matches($c, 'href="#([^"]*)"') | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_ -ne '' })
$badAnchors = @($anchors | Where-Object { -not $idSet.Contains($_) })
Write-Host "Anchor targets missing: $($badAnchors.Count) $($badAnchors -join ', ')" -ForegroundColor $(if ($badAnchors.Count) { 'Yellow' } else { 'Green' })

$overrideCount = @([regex]::Matches($c, 'background: transparent !important;')).Count
Write-Host "Background neutralizations: $overrideCount" -ForegroundColor Green
