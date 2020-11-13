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
                                <h3 class="mb-0">Сделка #{{ $operation->id }}</h3>
                            </div>
                        </div>
                    </div>

                    <div class="row card-body border-0">
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
                        <div class="col-md-6">
                            <table class="table">
                                <tr>
                                    <th>Пользователь:</th>
                                    <td>
                                        <a href="{{ route('telegramUser.show', $operation->telegram_user) }}">
                                            {{ $operation->telegram_user->username ?? ($operation->telegram_user->first_name ?? '' . $operation->telegram_user->last_name ?? '') }} <i class="ni ni-curved-next"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Сумма:</th>
                                    <td>{{ floatval($operation->amount) }} btc</td>
                                </tr>
                                <tr>
                                    <th>Стоимость:</th>
                                    <td>{{ number_format($operation->price, 2, '.', ' ') }} руб.</td>
                                </tr>
                                <tr>
                                    <th>Реквизиты:</th>
                                    <td><a href="{{ route('bankDetail.edit', $operation->bank_details) }}">{{ $operation->bank_details->title }} <i class="ni ni-curved-next"></i></a></td>
                                </tr>
                                <tr>
                                    <th>Кошелек:</th>
                                    <td>
                                        {{ $operation->btc_address }}
                                        @if($operation->link_transaction)
                                            <a href="{{ $operation->link_transaction }}"><i class="ni ni-curved-next"></i></a>
                                        @endif
                                    </td>
                                </tr>
                                <tr>
                                    <th>Дата:</th>
                                    <td>{{ date('d.m.Y H:i', strtotime($operation->created_at)) }}</td>
                                </tr>
                                <tr>
                                    <th>Статус:</th>
                                    <td class="{{ \App\Models\Operation::STATUSES[$operation->status]['class_color'] }}">{{ \App\Models\Operation::STATUSES[$operation->status]['text'] }}</td>
                                </tr>
                                @if($operation->error)
                                    <tr>
                                        <td colspan="2">
                                            <div class="alert alert-danger">{{ $operation->error }}</div>
                                        </td>
                                    </tr>
                                @endif
                                <tr>
                                    <td colspan="2">
                                        <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                            Комментарий к сделке
                                        </a>
                                        <div class="collapse" id="collapseExample">
                                            <div class="card card-body">
                                                <form action="{{ route('operation.addComment', $operation) }}" method="post">
                                                    @csrf
                                                    @method('PUT')
                                                    <textarea name="comment" class="form-control">{{ $operation->comment ?? '' }}</textarea>
                                                    <button type="submit" class="btn btn-sm btn-primary mt-1">Сохранить</button>
                                                </form>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-6">
                            @if($file)
                                <img src="{{ $file }}" width="" style="max-height: 700px; max-width: 100%;">
                            @endif
                        </div>

                        @if($operation->status == \App\Models\Operation::STATUS_CHECKING)
                            <div class="col mt-5">
                                <button class="btn btn-success operation-todo" data-form-id="operation-success-form">Подтвердить</button>
                                <button class="btn btn-danger operation-todo" data-form-id="operation-cancel-form">Отменить</button>
                                <button class="btn btn-secondary operation-todo" data-form-id="direct-to-operator-form">Направить к оператору</button>
                            </div>

                            <form action="{{ route('operation.success', $operation) }}" method="post" id="operation-success-form">
                                @csrf
                                @method('PUT')
                            </form>
                                <form action="{{ route('operation.cancel', $operation) }}" method="post" id="operation-cancel-form">
                                    @csrf
                                    @method('PUT')
                                </form>
                            <form action="{{ route('operation.directToOperator', $operation) }}" method="post" id="direct-to-operator-form">
                                @csrf
                            </form>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

@push('js')
    <script type="text/javascript">
        $('.operation-todo').on('click', function (){
            let todo = $(this);
            if (confirm('Вы действительно хотите ' + todo.text() + ' данную сделку')) {
                $('#' + todo.attr('data-form-id')).submit();
            }
        })
    </script>
@endpush
