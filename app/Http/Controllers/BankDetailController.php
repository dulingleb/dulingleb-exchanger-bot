<?php

namespace App\Http\Controllers;

use App\Models\BankDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Spatie\QueryBuilder\QueryBuilder;

class BankDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $bankDetails = QueryBuilder::for(BankDetail::class)
            ->allowedSorts(['title', 'status'])
            ->select(['id', 'title', 'status'])
            ->where('exchanger_id', auth()->user()->exchanger->id)
            ->jsonPaginate($request->perPage ?? Config::get('default_size', '10'));

        return $this->response($bankDetails);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'title' => 'required|string|min:2|max:198',
            'text' => 'required|string',
        ]);

        $bankDetail = BankDetail::create([
            'exchanger_id' => auth()->user()->exchanger->id,
            'title' => $request->title,
            'text' => $request->text,
            'status' => isset($request->status) ? 1 : 0
        ]);

        return $this->response($bankDetail, 'Реквизиты успешно добавлены');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BankDetail  $bankDetail
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(BankDetail $bankDetail): \Illuminate\Http\JsonResponse
    {
        $this->check($bankDetail);
        return $this->response($bankDetail);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BankDetail  $bankDetail
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, BankDetail $bankDetail): \Illuminate\Http\JsonResponse
    {
        $this->check($bankDetail);

        $request->validate([
            'title' => 'required|string|min:2|max:198',
            'text' => 'required|string',
        ]);

        $bankDetail->title = $request->title;
        $bankDetail->text = $request->text;
        $bankDetail->status = isset($request->status) ? 1 : 0;
        $bankDetail->save();

        return $this->response($bankDetail, 'Реквизиты успешно сохранены');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BankDetail  $bankDetail
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(BankDetail $bankDetail): \Illuminate\Http\JsonResponse
    {
        $this->check($bankDetail);

        $bankDetail->delete();

        return $this->response(null, 'Реквизиты успешно удалены');
    }

    private function check(BankDetail $bankDetail)
    {
        if ($bankDetail->exchanger_id != auth()->user()->exchanger->id) {
            abort(404);
        }
    }
}
