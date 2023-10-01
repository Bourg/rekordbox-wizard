interface TriggerXmlDownloadInput {
  content: XMLDocument;
  filename: string;
}

export function triggerXmlDownload({
  content,
  filename,
}: TriggerXmlDownloadInput) {
  // Serialize the document to a string
  const xmlSerializer = new XMLSerializer();
  const serializedXml = xmlSerializer.serializeToString(content);

  // Encode as a blob url
  const blob = new Blob([serializedXml], { type: 'application/xml' });
  const blobUrl = URL.createObjectURL(blob);

  // Attach to an anchor element
  const anchor = document.createElement('a');
  anchor.href = blobUrl;
  anchor.download = filename;

  // Trigger the download
  document.body.append(anchor);
  anchor.click();

  // Clean up
  document.body.removeChild(anchor);
  URL.revokeObjectURL(blobUrl);
}
