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
                                <h3 class="mb-0">Сообщения</h3>
                            </div>

                            @if(auth()->user()->isSuperAdmin())
                                <div class="col-4 text-right">
                                    <a href="{{ route('settings.messages.default.create') }}" class="btn btn-sm btn-primary">Добавить</a>
                                </div>
                            @endif

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
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col">Title</th>
                                @if(auth()->user()->isSuperAdmin())<th scope="col">slug</th>@endif
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($messages as $message)
                                <tr>
                                    <td>{{ $message->title }}</td>
                                    @if(auth()->user()->isSuperAdmin())
                                        <td>{{ $message->slug }}</td>
                                    @endif
                                    <td class="text-right">
                                        <div class="dropdown">
                                            <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fas fa-ellipsis-v"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                                <a class="dropdown-item" href="{{ route('settings.messages.edit', ['slug' => $message->slug]) }}">Изменить</a>

                                                @if(auth()->user()->isSuperAdmin())
                                                    <a class="dropdown-item" href="{{ route('settings.messages.default.edit', ['message' => $message->id]) }}">Шаблон</a>
                                                    <a class="dropdown-item text-danger" href="javascript:;" onclick="if(confirm('Вы действительно хотите удалить {{ $message->title }}?')) $('#delete-message_{{ $message->id }}').submit(); else return false;">Удалить</a>
                                                    <form id="delete-message_{{ $message->id }}" action="#" method="post">
                                                        @csrf
                                                        @method('DELETE')
                                                    </form>
                                                @endif
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
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

