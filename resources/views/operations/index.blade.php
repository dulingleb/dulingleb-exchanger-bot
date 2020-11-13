@extends('layouts.app')

@section('content')
    @include('layouts.headers.cards')
    <div class="container-fluid mt--7">
        <div class="row">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header border-0">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h3 class="mb-0">Сделки</h3>

                                <a href="{{ route('operations.index') }}" class="text-sm">Все</a> |
                                <a href="{{ route('operations.index', ['status' => \App\Models\Operation::STATUS_CHECKING]) }}" class="text-sm">Ожидают проверки</a>
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

                    <div class="table-responsive">
                        <table class="table align-items-center table-flush table-hover">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">BTC</th>
                                <th scope="col">руб.</th>
                                <th scope="col">Статус</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($operations as $operation)
                                <tr style="cursor: pointer;" onclick="window.location = '{{ route('operation.show', $operation) }}';"
                                    @if($operation->comment) data-toggle="tooltip" data-placement="top" title="{{ $operation->comment }}" @endif>
                                    <td>{{ $operation->id }}</td>
                                    <td>{{ $operation->telegram_user->username ?? ($operation->telegram_user->first_name ?? '' . $operation->telegram_user->last_name ?? '') }}</td>
                                    <td>{{ number_format($operation->amount, 4) }}</td>
                                    <td>{{ number_format($operation->price, 2, '.', ' ') }}</td>
                                    <td class="{{ \App\Models\Operation::STATUSES[$operation->status]['class_color'] }}">{{ \App\Models\Operation::STATUSES[$operation->status]['text'] }}</td>
                                </tr>
                            @endforeach
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="5" class="mb--1">
                                        {{ $operations->links() }}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="card-footer py-4">
                        <nav class="d-flex justify-content-end" aria-label="...">

                        </nav>
                    </div>
                </div>
            </div>
        </div>

    </div>

@endsection

