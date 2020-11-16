<?php

namespace App\Http\Controllers;

use App\Models\BankDetail;
use Illuminate\Http\Request;

class BankDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bankDetails = BankDetail::where('exchanger_id', auth()->user()->exchanger->id)->get();
        return view('bankDetails.index', compact('bankDetails'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('bankDetails.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|min:2|max:198',
            'text' => 'required|string',
        ]);

        BankDetail::create([
            'exchanger_id' => auth()->user()->exchanger->id,
            'title' => $request->title,
            'text' => $request->text,
            'status' => isset($request->status) ? 1 : 0
        ]);

        return redirect()->route('bankDetail.index')->with(['success' => 'Реквизиты успешно добавлены']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BankDetail  $bankDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(BankDetail $bankDetail)
    {
        if ($bankDetail->exchanger_id != auth()->user()->exchanger->id) {
            return redirect()->route('bankDetail.index')->withErrors(['auth' => 'Ошибка авторизации']);
        }
        return view('bankDetails.edit', compact('bankDetail'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BankDetail  $bankDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BankDetail $bankDetail)
    {
        if ($bankDetail->exchanger_id != auth()->user()->exchanger->id) {
            return redirect()->route('bankDetail.index')->withErrors(['auth' => 'Ошибка авторизации']);
        }

        $request->validate([
            'title' => 'required|string|min:2|max:198',
            'text' => 'required|string',
        ]);

        $bankDetail->title = $request->title;
        $bankDetail->text = $request->text;
        $bankDetail->status = isset($request->status) ? 1 : 0;
        $bankDetail->save();

        return redirect()->route('bankDetail.index')->with(['success' => 'Реквизиты успешно сохранены']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BankDetail  $bankDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy(BankDetail $bankDetail)
    {
        if ($bankDetail->exchanger_id != auth()->user()->exchanger->id) {
            return redirect()->route('bankDetail.index')->withErrors(['auth' => 'Ошибка авторизации']);
        }

        $bankDetail->delete();

        return redirect()->route('bankDetail.index')->with(['success' => 'Реквизиты успешно удалены']);
    }
}
