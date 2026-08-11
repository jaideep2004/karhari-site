$c = Get-Content (Join-Path $PSScriptRoot 'combined.html') -Raw
foreach ($t in @('</html>', '</body>', '</style>', '</head>', '<html ')) {
  Write-Host ($t + ': ' + [regex]::Matches($c, [regex]::Escape($t)).Count)
}
Remove-Item (Join-Path $PSScriptRoot 'check-combined.ps1') -ErrorAction SilentlyContinue
Write-Host 'cleaned'
