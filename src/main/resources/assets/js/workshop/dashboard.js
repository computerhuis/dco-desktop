'use strict';

$(document).ready(function () {
    let table = $('#dashboard-table').DataTable({
        columns: [
            {
                render: function (data, type, row, meta) {
                    return '<a class="link-opacity-25-hover" href="./ticket/' + row['id'] + '">' + row['id'] + '</a>';
                }
            },
            {
                render: function (data, type, row, meta) {
                    return row['firstName'] + ' ' + row['infix'] + ' ' + row['lastName'];
                }
            },
            {
                render: function (data, type, row, meta) {
                    return '<a class="link-opacity-25-hover" href="./computer/' + row['computerId'] + '">' + row['computerId'] + '</a>';
                }
            },
            {
                render: function (data, type, row, meta) {
                    switch (row['status']) {
                        case 'IN_PROGRESS':
                            return '<span class="badge text-bg-danger">' + row['statusName'] + '</span>';
                        case 'OPEN':
                            return '<span class="badge text-bg-success">' + row['statusName'] + '</span>';
                        case 'READY':
                            return '<span class="badge text-bg-primary">' + row['statusName'] + '</span>';
                        case 'CUSTOMER_INFORMED':
                            return '<span class="badge text-bg-warning">' + row['statusName'] + '</span>';
                        case 'CLOSED':
                            return '<span class="badge text-bg-secondary">' + row['statusName'] + '</span>';
                    }
                }
            },
            {
                render: function (data, type, row, meta) {
                    return new Date(row['registered']).toLocaleDateString();
                }
            },
            {
                render: function (data, type, row, meta) {
                    return row['manufacturer'] + ' / ' + row['model'];
                }
            },
            {
                render: function (data, type, row, meta) {
                    let json = JSON.parse(row['description'])
                    return json['probleem'];
                }
            },
            {
                render: function (data, type, row, meta) {
                    return "";
                }
            }
        ],
        language: {
            url: data_table_language()
        },
        ajax: './api/workshop'
    });

    setInterval(function () {
        table.ajax.reload();
    }, 5000);
});
