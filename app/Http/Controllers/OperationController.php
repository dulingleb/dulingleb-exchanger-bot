<?php

namespace App\Http\Controllers;

use App\Models\Operation;
use App\Models\TelegramUserSetting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;
use Telegram;

class OperationController extends Controller
{
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $operations = QueryBuilder::for(Operation::class)
            ->with('telegram_user')
            ->allowedSorts([AllowedSort::field('id', 'operations.id'), 'status', 'amount', 'price'])
            ->defaultSort('-operations.id')
            ->allowedFilters([
                'telegram_user_id',
                AllowedFilter::scope('telegram_user_name', 'telegram_user'),
                'status'
            ])
            ->where('exchanger_id', auth()->user()->exchanger->id)
            ->jsonPaginate();

        return $this->response($operations);
    }

    public function show(Operation $operation): \Illuminate\Http\JsonResponse
    {
        $this->checkOwnerOperation($operation);

        return $this->response($operation->load(['telegram_user', 'bank_details']));
    }

    public function addComment(Request $request, Operation $operation): \Illuminate\Http\JsonResponse
    {
        $this->checkOwnerOperation($operation);

        $operation->comment = $request->comment;
        $operation->save();

        return $this->response($operation, 'Комментаорий успешно добавлен');
    }

    public function success(Operation $operation)
    {
        $this->checkStatusOperation($operation);
        $errors = $operation->successOperation();
        if ($errors !== true) {
            return $this->responseError('Ошибка отправки', $errors);
        }

        return $this->response($operation, 'Операция #' . $operation->id . ' успешно подтверждена');
    }

    public function directToOperator(Operation $operation): \Illuminate\Http\JsonResponse
    {
        $this->checkStatusOperation($operation);
        $operation->directToOperator();
        return $this->response($operation, 'Сообщение успешно отправлено');
    }

    public function cancel(Operation $operation): \Illuminate\Http\JsonResponse
    {
        $this->checkStatusOperation($operation);
        $operation->cancelOperation();
        return $this->response($operation, 'Операция успещно отменена');
    }

    public function getOperationsCount(): \Illuminate\Http\JsonResponse
    {
        $operations = Operation::where('exchanger_id', auth()->user()->exchanger->id)->where('status', Operation::STATUS_SUCCESS);
        $data['operations_count'] = $operations->count();
        $data['operations_count_today'] = $operations->where('updated_at', '>', Carbon::now()->format('Y-m-d 00:00:00'))->count();

        return $this->response($data);
    }

    public function getOperationsSum(): \Illuminate\Http\JsonResponse
    {
        $operations = Operation::where('exchanger_id', auth()->user()->exchanger->id)->where('status', Operation::STATUS_SUCCESS);
        $data['operations_sum'] = $operations->sum('price');
        $data['operations_sum_today'] = $operations->where('updated_at', '>', Carbon::now()->format('Y-m-d 00:00:00'))->sum('price');

        return $this->response($data);
    }

    public function getOperationsWait(): \Illuminate\Http\JsonResponse
    {
        $data = Operation::where('exchanger_id', auth()->user()->exchanger->id)->where('status', Operation::STATUS_CHECKING)->count();
        return $this->response($data);
    }

    public function chart(Request $request)
    {
        $data = [];
        $month = Carbon::now()->month;
        $year = Carbon::now()->year;

        if ($request->period == 'month') {
            $i = $month;
            do {
                if ($i == 0) {
                    $i = 12;
                    $year--;
                }

                $counts = Operation::where('exchanger_id', auth()->user()->exchanger->id)->where('status', Operation::STATUS_SUCCESS)->whereYear('updated_at', $year)->whereMonth('updated_at', $i);
                if ($request->type == 'sum') {
                    $counts = $counts->sum('price');
                } else {
                    $counts = $counts->count();
                }

                $data[] = ['period' => $i, 'value' => $counts];

                $i--;
            } while ($i != $month);
        } else {
            for ($i = 0; $i < 7; $i++) {

                $counts = Operation::where('exchanger_id', auth()->user()->exchanger->id)->where('status', Operation::STATUS_SUCCESS)
                    ->whereBetween('updated_at', [Carbon::now()->subDay($i)->format('Y-m-d 00:00:00'), Carbon::now()->subDay($i)->format('Y-m-d 23:59:59')]);
                if ($request->type == 'sum') {
                    $counts = $counts->sum('price');
                } else {
                    $counts = $counts->count();
                }

                $data[] = ['period' => Carbon::now()->subDay($i+1)->dayOfWeek, 'value' => $counts];
            }
        }

        $data = array_reverse($data);

        return $this->response($data);
    }

    public function changeFilesName()
    {
        $files = array_diff(scandir(public_path('storage/images')), array('.', '..'));
        foreach ($files as $file) {
            if (strpos($file, '_')) {
                continue;
            }
            $vFile = explode('.', $file);
            rename(public_path('storage/images') . '/' . $file, public_path('storage/images') . '/' . $vFile[0] . '_0' . '.jpg');
        }

        $files = array_diff(scandir(public_path('storage/images')), array('.', '..'));
        dd($files);
    }

    private function checkStatusOperation(Operation $operation)
    {
        if (auth()->user()->exchanger->id != $operation->exchanger_id ||
            $operation->status != Operation::STATUS_CHECKING) {
            abort(404);
        }
    }

    private function checkOwnerOperation(Operation $operation)
    {
        if (auth()->user()->exchanger->id != $operation->exchanger_id) {
            abort(404);
        }
    }
}
