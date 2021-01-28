<?php

namespace App\Http\Controllers;

use App\Models\ExchangerCommission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Spatie\QueryBuilder\QueryBuilder;

class ExchangerCommissionController extends Controller
{
    public function index(): \Illuminate\Http\JsonResponse
    {
        $commissions = QueryBuilder::for(ExchangerCommission::class)
            ->allowedSorts(['from', 'to', 'percent'])
            ->select(['id', 'from', 'to', 'percent'])
            ->where('exchanger_id', auth()->user()->exchanger->id)
            ->jsonPaginate();

        return $this->response($commissions);
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validate($request, [
            'from' => ['required', 'numeric', 'min:0', function($a, $value, $fail) {
                if (ExchangerCommission::where('from', '<=', $value)->where('to', '>', $value)->where('exchanger_id', auth()->user()->exchanger->id)->exists()) {
                    $fail('Значение в данном диапазоне уже существует.');
                }
            }],
            'to' => ['required', 'numeric', 'min:0', function($a, $value, $fail) {
                if (ExchangerCommission::where('from', '<', $value)->where('to', '>=', $value)->where('exchanger_id', auth()->user()->exchanger->id)->exists()) {
                    $fail('Значение в данном диапазоне уже существует.');
                }
            }],
            'percent' => 'required|numeric|min:0|max:99'
        ]);

        $commission = ExchangerCommission::create([
            'exchanger_id' => auth()->user()->exchanger->id,
            'from' => $request->from,
            'to' => $request->to,
            'percent' => $request->percent
        ]);

        return $this->response($commission, 'Комиссия успешно добавлена');
    }

    public function show(ExchangerCommission $commission): \Illuminate\Http\JsonResponse
    {
        return $this->response($commission);
    }

    public function update(Request $request, ExchangerCommission $commission): \Illuminate\Http\JsonResponse
    {
        $this->check($commission);

        $this->validate($request, [
            'from' => ['required', 'numeric', 'min:0', function($a, $value, $fail) use ($commission) {
                if (ExchangerCommission::where('from', '<=', $value)->where('to', '>', $value)->where('id', '!=', $commission->id)->where('exchanger_id', auth()->user()->exchanger->id)->exists()) {
                    $fail('Значение в данном диапазоне уже существует.');
                }
            }],
            'to' => ['required', 'numeric', 'min:0', function($a, $value, $fail) use ($commission) {
                if (ExchangerCommission::where('from', '<', $value)->where('to', '>=', $value)->where('id', '!=', $commission->id)->where('exchanger_id', auth()->user()->exchanger->id)->exists()) {
                    $fail('Значение в данном диапазоне уже существует.');
                }
            }],
            'percent' => 'required|numeric|min:0|max:99'
        ]);

        $commission->from = $request->from;
        $commission->to = $request->to;
        $commission->percent = $request->percent;
        $commission->save();

        return $this->response($commission, 'Комиссия успешно сохранена');
    }

    public function destroy(ExchangerCommission $commission)
    {
        $this->check($commission);

        $commission->delete();

        return $this->response(null, 'Комиссия успешно удалена');
    }

    private function check(ExchangerCommission $commission)
    {
        if ($commission->exchanger_id != auth()->user()->exchanger->id) {
            abort(404);
        }
    }

}
