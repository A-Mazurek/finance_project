document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const categoryFilter = document.getElementById('categoryFilter');
    const searchFilter = document.getElementById('searchFilter');
    const thresholdInput = document.getElementById('thresholdInput');


    function filterRows() {
        const categoryValue = categoryFilter.value.toLowerCase();
        const searchValue = searchFilter.value.toLowerCase();
        const thresholdValue = parseFloat(thresholdInput.value);

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const categoryMatch = categoryValue === "" || cells[3].textContent.toLowerCase() === categoryValue;
            const searchMatch = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchValue));
            row.style.display = categoryMatch && searchMatch ? '' : 'none';

            // Highlight rows with amount greater than threshold
            const amount = parseFloat(cells[2].textContent);
            if (!isNaN(amount) && amount > thresholdValue) {
                row.style.color = 'red';
            } else {
                row.style.color = '';
            }
        });
    }

    categoryFilter.addEventListener('change', filterRows);
    searchFilter.addEventListener('keyup', filterRows);
    thresholdInput.addEventListener('input', filterRows);

    // Initial call to apply filters and highlighting
    filterRows();

    // Highlight rows on hover
    rows.forEach(row => {
        row.addEventListener('mouseover', () => {
            row.style.backgroundColor = '#f1f1f1';
        });
        row.addEventListener('mouseout', () => {
            row.style.backgroundColor = '';
        });
    });
});
