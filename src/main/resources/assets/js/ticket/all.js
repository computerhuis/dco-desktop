'use strict';

$(document).ready(function () {
    $('#ticket-table').DataTable({
        columns: [
            {
                render: function (data, type, row, meta) {
                    return '<a class="link-opacity-25-hover" href="./ticket/' + row['id'] + '">' + row['id'] + '</a>';
                }
            },
            {
                render: function (data, type, row, meta) {
                    return row['ticketType'];
                }
            },
            {
                render: function (data, type, row, meta) {
                    return row['status'];
                }
            },
            {
                render: function (data, type, row, meta) {
                    return '<a class="link-opacity-25-hover" href="./computer/' + row['computerId'] + '">' + row['computerId'] + '</a>';
                }
            },
            {
                render: function (data, type, row, meta) {
                    return new Date(row['registered']).toLocaleDateString();
                }
            },
            {
                render: function (data, type, row, meta) {
                    if (row['unregistered'] != null) {
                        return new Date(row['unregistered']).toLocaleDateString();
                    }
                    return '';
                }
            }
        ],
        language: {
            url: data_table_language()
        },
        ajax: './api/ticket'
    });
});
