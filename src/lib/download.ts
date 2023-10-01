export function triggerXmlDownload(contents: string) {
  const blob = new Blob([contents], { type: 'application/xml' });
  const blobUrl = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = blobUrl;
  anchor.download = 'rekordbox-database.xml';

  document.body.append(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(blobUrl);
}
