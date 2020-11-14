<?php

namespace App\Http\Controllers;

use App\Models\ExchangerCommission;
use Illuminate\Http\Request;

class ExchangerCommissionController extends Controller
{
    public function index()
    {
        $commissions = ExchangerCommission::where('exchanger_id', auth()->user()->exchanger->id)->get();
        return view('commissions.index', compact('commissions'));
    }

    public function create()
    {
        return view('commissions.create');
    }

    public function store(Request $request, ExchangerCommission  $commission)
    {
        $request->validate([
            'from' => ['required', 'numeric', 'min:0', function($a, $value, $fail) {
                if (ExchangerCommission::where('from', '<=', $value)->where('to', '>', $value)->exists()) {
                    $fail('Значение в данном диапазоне уже существует.');
                }
            }],
            'to' => ['required', 'numeric', 'min:0', function($a, $value, $fail) {
                if (ExchangerCommission::where('from', '<', $value)->where('to', '>=', $value)->exists()) {
                    $fail('Значение в данном диапазоне уже существует.');
                }
            }],
            'percent' => 'required|numeric|min:0|max:99'
        ]);

        ExchangerCommission::create([
            'exchanger_id' => auth()->user()->exchanger->id,
            'from' => $request->from,
            'to' => $request->to,
            'percent' => $request->percent
        ]);

        return redirect()->route('commission.index')->with(['success' => 'Комиссия успешно добавлена']);
    }

    public function edit(ExchangerCommission $commission)
    {
        return view('commissions.edit', compact('commission'));
    }

    public function update(Request $request, ExchangerCommission $commission)
    {
        $request->validate([
            'from' => ['required', 'numeric', 'min:0', function($a, $value, $fail) use ($commission) {
                if (ExchangerCommission::where('from', '<=', $value)->where('to', '>', $value)->where('id', '!=', $commission->id)->exists()) {
                    $fail('Значение в данном диапазоне уже существует.');
                }
            }],
            'to' => ['required', 'numeric', 'min:0', function($a, $value, $fail) use ($commission) {
                if (ExchangerCommission::where('from', '<', $value)->where('to', '>=', $value)->where('id', '!=', $commission->id)->exists()) {
                    $fail('Значение в данном диапазоне уже существует.');
                }
            }],
            'percent' => 'required|numeric|min:0|max:99'
        ]);

        if ($commission->exchanger_id !== auth()->exchanger->id)
        {
            return redirect()->route('commission.index')->withErrors(['auth' => 'Ошибка авторизации']);
        }

        $commission->from = $request->from;
        $commission->to = $request->to;
        $commission->percent = $request->percent;
        $commission->save();

        return redirect()->route('commission.index')->with(['success' => 'Комиссия успешно сохранена!']);
    }

    public function destroy(ExchangerCommission $commission)
    {
        if ($commission->exchanger_id !== auth()->id()) {
            return redirect()->route('commission.index')->withErrors(['auth' => 'Ошибка авторизации']);
        }

        $commission->delete();

        return redirect()->route('commission.index')->with(['success' => 'Комиссия успешно удалена']);
    }

}
