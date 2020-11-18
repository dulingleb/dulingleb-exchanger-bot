<script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>

<script type="application/javascript">
    tinymce.init({
        selector: '#text-input',
        toolbar: 'undo redo | bold italic underline strikethrough link | styleselect | emoticons | code |',
        formats: {
            underline: {block: 'ins'},
            strikethrough: {block: 's'},
            pre: {block: 'pre'}
        },
        style_formats: [
            { title: 'Блоки', items: [
                    {title: 'pre', format: 'pre'},
                    {title: 'code', format: 'code'}
                ] }
        ],
        menubar: false,
        plugins: 'code emoticons link paste',
        convert_fonts_to_spans: false,
        element_format : 'html',
        forced_root_block : false,
        branding: false,
        paste_as_text: true,
        setup: function (editor) {
            editor.on('init', function (e) {
                setTimeout(() => {
                    $('.tox-notification__dismiss').click();
                }, 50)

            });
        }
    });
</script>
