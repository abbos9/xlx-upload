let workbook;  // Variable to hold the Excel file

// Function to read the uploaded Excel file
document.getElementById('fileUpload').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        workbook = XLSX.read(data, { type: 'array' });
    };
    reader.readAsArrayBuffer(e.target.files[0]);
});

// Function to handle form submission and Excel file generation
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Check if a workbook exists (uploaded by the user)
    if (!workbook) {
        workbook = XLSX.utils.book_new();  // Create a new workbook
        const worksheet = XLSX.utils.aoa_to_sheet([["Name", "Email"]]);  // Add headers
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");  // Create a new sheet
    }

    // Get the first worksheet
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Convert the sheet to JSON to determine the next available row
    const jsonSheet = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const nextRow = jsonSheet.length + 1;

    // Append new data to the worksheet
    XLSX.utils.sheet_add_aoa(sheet, [[name, email]], { origin: `A${nextRow}` });

    // Trigger download of the updated or new Excel file
    XLSX.writeFile(workbook, 'form_data.xlsx');
});