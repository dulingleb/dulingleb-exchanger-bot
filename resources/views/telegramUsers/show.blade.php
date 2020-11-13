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
                                <h3 class="mb-0">Пользователь {{ $user->username ?? ($user->first_name ?? '' . $user->last_name ?? '') }}</h3>
                            </div>
                            <div class="col-4 text-right">
                                <a href="javascript:;" class="text-danger" onclick="if (confirm('Вы действительно хотите назначить этого пользователя {{ $user->setting->role == 'admin' ? 'пользователем' : 'админом' }}?')) $('#set-as-admin').submit();">{{ $user->setting->role == 'admin' ? 'Сделать пользователем' : 'Назначить админом' }}</a>
                                <form action="{{ route('telegramUser.setAsAdmin', $user) }}" method="post" id="set-as-admin">
                                    @csrf
                                    @method('PUT')
                                    <input type="hidden" name="role" value="{{ $user->setting->role == 'admin' ? 'user' : 'admin' }}">
                                </form>
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
                                    <th>id:</th>
                                    <td>{{ $user->id }}</td>
                                </tr>
                                <tr>
                                    <th>Username:</th>
                                    <td>{{ $user->username ?? '' }}</td>
                                </tr>
                                <tr>
                                    <th>Имя Фамилия:</th>
                                    <td>{{ $user->first_name ?? '' . $user->last_name ?? '' }}</td>
                                </tr>
                                <tr>
                                    <th>Подтвержденных сделок:</th>
                                    <td>
                                        <a href="{{ route('operations.index', ['user' => $user->id]) }}">
                                            {{ $user->operations->where('status', \App\Models\Operation::STATUS_SUCCESS)->count() }}
                                            <i class="ni ni-curved-next"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Сделок на сумму:</th>
                                    <td>{{ $user->operations->where('status', \App\Models\Operation::STATUS_SUCCESS)->sum('price') }} руб.</td>
                                </tr>
                                <tr>
                                    <th>Рефералов:</th>
                                    <td>{{ $user->setting->where('referer_id', $user->setting->id)->count() }}</td>
                                </tr>
                                <tr>
                                    <th>Сделок рефов:</th>
                                    <td>{{ $user->setting->referralOperationsCount() }}</td>
                                </tr>
                                <tr>
                                    <th>Сделок рефов на сумму:</th>
                                    <td>{{ $user->setting->referralOperationsSum('price') }} руб.</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-6">
                            <form action="{{ route('telegramUser.update', $user) }}" method="post">
                                @csrf
                                @method('PUT')
                                <div class="form-group">
                                    <label for="discount">Персональная скидка</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon2">%</span>
                                        </div>
                                        <input type="number" value="{{ $user->setting->discount ?? 0 }}" class="form-control" id="discount" name="discount" min="0" max="100%" step="0.5">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="comment">Примечание</label>
                                    <textarea name="comment" class="form-control" id="comment" cols="3">{{ $user->setting->comment ?? '' }}</textarea>
                                </div>

                                <table>
                                    <tr>
                                        <td><label for="ban">Бан</label></td>
                                        <td>
                                            <label class="custom-toggle ml-3">
                                                <input type="checkbox" name="ban" id="ban" {{ $user->setting->ban ? 'checked' : '' }}>
                                                <span class="custom-toggle-slider rounded-circle"></span>
                                            </label>
                                        </td>
                                    </tr>
                                </table>

                                <button class="btn btn-primary mt-3" type="submit">Сохранить</button>
                            </form>
                        </div>

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
