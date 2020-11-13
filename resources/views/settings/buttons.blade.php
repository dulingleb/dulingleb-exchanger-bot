@extends('layouts.app')

@section('content')
    @include('layouts.headers.empty')
    <div class="container-fluid mt--7">
        <div class="row">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header border-0">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h3 class="mb-0">Ссылки в главном меню</h3>
                            </div>

                            @if(session()->has('success'))
                                <div class="col-12">
                                    <div class="alert alert-success alert-dismissible mt-4 fade show" role="alert">
                                        <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                        <span class="alert-text"><strong>Успех!</strong> {{ session()->get('success') }}</span>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                </div>
                            @endif

                            @if($errors->any())
                                <div class="col-12">
                                    <div class="alert alert-danger alert-dismissible mt-4 fade show" role="alert">
                                        <span class="alert-icon"><i class="ni ni-air-baloon"></i></span>
                                        {!! implode('', $errors->all('<span class="alert-text">:message</span>')) !!}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>

                    <div class="card-body">
                        <form action="{{ route('settings.buttons.update') }}" method="post">
                            @csrf
                            @method('PATCH')
                            <table class="table table-buttons">
                                <thead>
                                    <th>Текст</th>
                                    <th>Ссылка</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    @foreach($buttons as $key => $button)
                                        <tr>
                                            <td>
                                                <input type="text" class="form-control" name="button[{{ $key }}][text]" value="{{ $button->text }}">
                                            </td>
                                            <td>
                                                <input type="text" class="form-control" name="button[{{ $key }}][link]" value="{{ $button->url }}">
                                            </td>
                                            <td class="text-right">
                                                <button type="button" class="btn btn-danger button-delete"><i class="ni ni-fat-delete"></i></button>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td class="text-right" colspan="3">
                                            <button type="button" class="btn btn-success" id="add-button"><i class="ni ni-fat-add"></i></button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                            <button class="btn btn-primary mt-5" type="submit">Сохранить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script>
        $('#add-button').on('click', function () {
            let num = 0;
            if ($('.table-buttons tbody tr').length != 0) {
                num = 1 + parseInt($('.table-buttons tbody tr:last-child td input').prop('name').match(/\d+/).toString());
                console.log(num);
            }
            $('.table-buttons tbody').append('<tr>' +
                '                                <td>' +
                '                                    <input type="text" class="form-control" name="button[' + num + '][text]">' +
                '                                </td>' +
                '                                <td>' +
                '                                    <input type="text" class="form-control" name="button[' + num + '][link]">' +
                '                                 </td>' +
                '                                 <td class="text-right">' +
                '                                     <button type="button" class="btn btn-danger button-delete"><i class="ni ni-fat-delete"></i></button>' +
                '                                 </td>' +
                '                             </tr>')
        });

        $(document).on('click', '.button-delete', function () {
            $(this).parent().parent().remove();
        });
    </script>
@endpush
