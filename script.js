function generateFilter() {
  const fileInput = document.getElementById('fileInput');
  const output = document.getElementById('output');
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

    // Ambil hanya nilai dari kolom A mulai dari baris ke-2 (A2)
    const idbsList = rows
      .slice(1) // mulai dari baris ke-2
      .map(row => row[0]) // ambil kolom A (kolom 0)
      .filter(val => typeof val === 'string' && val.trim() !== '');

    const filterString = idbsList.map(id => `"idbs" = '${id}'`).join(' OR ');

    output.value = filterString;
  };
  reader.readAsArrayBuffer(file);
}

function copyToClipboard() {
  const output = document.getElementById('output');
  const text = output.value;

  if (!navigator.clipboard) {
    alert('Clipboard API tidak didukung di browser ini.');
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => alert('Filter berhasil disalin ke clipboard!'))
    .catch(err => alert('Gagal menyalin teks: ' + err));
}

function downloadTemplate() {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([
    ['IDBS'],            // Header di A1
    ['6306010001001B'],  // Contoh IDBS di A2
    ['6306010001002B']   // Contoh tambahan di A3 (opsional)
  ]);
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  XLSX.writeFile(wb, 'template-idbs.xlsx');
}

