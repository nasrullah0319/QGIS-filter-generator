function generateFilter() {
  const fileInput = document.getElementById('fileInput');
  const output = document.getElementById('output');
  const filterType = document.getElementById('filterType').value;

  if (!fileInput.files.length) {
    alert('Silakan unggah file Excel terlebih dahulu.');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const idList = rows
      .slice(1) // mulai dari baris ke-2
      .map(row => row[0]) // ambil kolom A
      .filter(val => typeof val === 'string' && val.trim() !== '');

    if (idList.length === 0) {
      output.value = 'Tidak ada data ID yang valid di file.';
      return;
    }

    const filterString = idList.map(id => `"${filterType}" = '${id}'`).join(' OR ');
    output.value = filterString;
  };
  reader.readAsArrayBuffer(file);
}

function copyToClipboard() {
  const output = document.getElementById('output');
  navigator.clipboard.writeText(output.value).then(() => {
    alert('Filter berhasil disalin ke clipboard!');
  }).catch(err => {
    alert('Gagal menyalin: ' + err);
  });
}

function downloadTemplate() {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([
    ['IDBS / IDSLS'],     // Header
    ['6306010001001B'],
    ['6306010001002B']
  ]);
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  XLSX.writeFile(wb, 'template-id.xlsx');
}
