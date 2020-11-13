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
                                <h3 class="mb-0">Users</h3>
                            </div>
                            <div class="col-4 text-right">
                                <form class="float-right navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                                    <div class="form-group mb-0">
                                        <div class="input-group input-group-alternative">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text text-black-50"><i class="fas fa-search"></i></span>
                                            </div>
                                            <input class="form-control text-black-50" name="s" placeholder="Search" type="text" value="{{ request('s') ?? '' }}">
                                        </div>
                                    </div>
                                </form>
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
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">login</th>
                                <th scope="col">сделок</th>
                                <th scope="col">скидка</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($users as $user)
                                <tr style="cursor: pointer;" onclick="location.href = '{{ route('telegramUser.show', $user) }}'">
                                    <td>{{ $user->id }}</td>
                                    <td>{{ $user->username ?? ($user->first_name ?? '' . $user->last_name ?? '') }}</td>
                                    <td>{{ $user->operations_count }}</td>
                                    <td>{{ $user->setting->discount }}%</td>
                                </tr>
                            @endforeach
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="4">
                                        {{ $users->links() }}
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

