export function createAndDownloadFile(data: any, name: string) {
  const element = document.createElement('a');
  const file = new Blob([data], {
    type: 'application/json'
  });
  element.href = URL.createObjectURL(file);
  element.download = name;
  element.click();
}
