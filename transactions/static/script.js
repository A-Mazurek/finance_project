document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');
    const headers = table.querySelectorAll('th');
    const rows = Array.from(table.querySelectorAll('tbody tr'));

    // Sort table by column
    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            const sortedRows = rows.sort((a, b) => {
                const aText = a.querySelectorAll('td')[index].textContent;
                const bText = b.querySelectorAll('td')[index].textContent;

                return aText.localeCompare(bText, undefined, {
                    numeric: index === 2, // Sort numerically if it's the amount column
                    sensitivity: 'base'
                });
            });

            while (table.querySelector('tbody').firstChild) {
                table.querySelector('tbody').removeChild(table.querySelector('tbody').firstChild);
            }

            table.querySelector('tbody').append(...sortedRows);
        });
    });

    // Filter table
    const filterInput = document.createElement('input');
    filterInput.setAttribute('type', 'text');
    filterInput.setAttribute('placeholder', 'Filter transactions...');
    table.parentElement.insertBefore(filterInput, table);

    filterInput.addEventListener('keyup', () => {
        const filterValue = filterInput.value.toLowerCase();

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const matches = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filterValue));
            row.style.display = matches ? '' : 'none';
        });
    });

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
