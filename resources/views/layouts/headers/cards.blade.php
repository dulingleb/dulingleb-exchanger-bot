<div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
    <div class="container-fluid">
        <div class="header-body">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <div class="card card-stats mb-4 mb-xl-0">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <h5 class="card-title text-uppercase text-muted mb-0">Статус</h5>
                                    <span class="h2 font-weight-bold mb-0" id="exchanger-status">{{ auth()->user()->exchanger->status == \App\Models\Exchanger::STATUS_ACTIVE ? 'В работе' : 'Закрыто' }}</span>
                                </div>
                                <div class="col-auto">
                                    <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                                        <i class="fas fa-chart-bar"></i>
                                    </div>
                                </div>
                            </div>
                            <p class="mt-3 mb-0 text-muted text-sm">
                                <a href="javascript:;" id="exchanger-start-stop">{{ auth()->user()->exchanger->status == \App\Models\Exchanger::STATUS_ACTIVE ? 'Остановить' : 'Запустить' }}</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <div class="card card-stats mb-4 mb-xl-0">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <h5 class="card-title text-uppercase text-muted mb-0">Пользователи</h5>
                                    <span class="h2 font-weight-bold mb-0">
                                        {{ number_format(\App\Models\TelegramUserSetting::where('exchanger_id', auth()->user()->exchanger->id)->count(), 0, '.', ' ') }}
                                    </span>
                                </div>
                                <div class="col-auto">
                                    <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
                                        <i class="fas fa-chart-pie"></i>
                                    </div>
                                </div>
                            </div>
                            <p class="mt-3 mb-0 text-muted text-sm">
                                <span class="text-success mr-2">+ {{ \App\Models\TelegramUserSetting::where('exchanger_id', auth()->user()->exchanger->id)->where('created_at', '>=', date('Y-m-d', time()))->count() }}</span>
                                <span class="text-nowrap">За сегодня</span>
                            </p>
                        </div>
                    </div>
                </div>
                {{--<div class="col-xl-3 col-lg-6">
                    <div class="card card-stats mb-4 mb-xl-0">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <h5 class="card-title text-uppercase text-muted mb-0">Sales</h5>
                                    <span class="h2 font-weight-bold mb-0">924</span>
                                </div>
                                <div class="col-auto">
                                    <div class="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                        <i class="fas fa-users"></i>
                                    </div>
                                </div>
                            </div>
                            <p class="mt-3 mb-0 text-muted text-sm">
                                <span class="text-warning mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span>
                                <span class="text-nowrap">Since yesterday</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <div class="card card-stats mb-4 mb-xl-0">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <h5 class="card-title text-uppercase text-muted mb-0">Performance</h5>
                                    <span class="h2 font-weight-bold mb-0">49,65%</span>
                                </div>
                                <div class="col-auto">
                                    <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                        <i class="fas fa-percent"></i>
                                    </div>
                                </div>
                            </div>
                            <p class="mt-3 mb-0 text-muted text-sm">
                                <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 12%</span>
                                <span class="text-nowrap">Since last month</span>
                            </p>
                        </div>
                    </div>
                </div>--}}
            </div>
        </div>
    </div>
</div>

@push('js')
    <script>
        $('#exchanger-start-stop').on('click', function () {
            $.ajax({
                method: 'post',
                url: '{{ route('settings.set.status') }}',
                data: {
                    '_token': "{{ csrf_token() }}"
                },
                success: function (e) {
                    $('#exchanger-status').text(e);
                    if (e == 'В работе') {
                        $('#exchanger-start-stop').text('Остановить')
                    } else {
                        $('#exchanger-start-stop').text('Запустить')
                    }
                }
            })
        });
    </script>
@endpush
