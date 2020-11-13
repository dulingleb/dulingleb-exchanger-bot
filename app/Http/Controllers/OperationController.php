<?php

namespace App\Http\Controllers;

use App\Func\Coinbase;
use App\Models\ExchangerMessage;
use App\Models\Operation;
use http\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Telegram;

class OperationController extends Controller
{
    public function index(Request $request)
    {
        $operations = Operation::where('exchanger_id', auth()->user()->exchanger->id);

        if ($request->exists('status') && array_key_exists($request->status, Operation::STATUSES)) {
            $operations = $operations->where('status', $request->status);
        }

        if ($request->exists('user')) {
            $operations = $operations->where('telegram_user_id', $request->user);
        }

        $operations = $operations->latest()->paginate(50);
        return response()->view('operations.index', compact('operations'));
    }

    public function show(Operation $operation)
    {
        if ($operation->exchanger_id != auth()->user()->exchanger->id) {
            abort(404);
        }

        $allFiles = Storage::files('public/images');
        $matchingFiles = preg_grep('/' . $operation->id . '\./', $allFiles);

        $file = false;
        if ($matchingFiles) {
            $file = '/storage/' . str_replace('public/', '', $matchingFiles[array_key_first($matchingFiles)]);
        }

        return response()->view('operations.show', compact('operation', 'file'));
    }

    public function addComment(Request $request, Operation $operation)
    {
        if (auth()->user()->exchanger->id !== $operation->exchanger_id) {
            abort(404);
        }

        $operation->comment = $request->comment;
        $operation->save();

        return redirect()->route('operation.show', $operation)->with(['success' => 'Комментарий успешно сохранен']);
    }

    public function success(Operation $operation)
    {
        $this->checkOperation($operation);
        $errors = $operation->successOperation();
        if ($errors !== true) {
            return redirect()->route('operation.show', $operation)->withErrors(['first' => $errors[0]->message]);
        }

        return redirect()->route('operations.index')->with(['success' => 'Операция #' . $operation->id . ' успешно подтверждена']);
    }

    public function directToOperator(Operation $operation)
    {
        $this->checkOperation($operation);
        $operation->directToOperator();
        return redirect()->route('operation.show', $operation)->with(['success' => 'Сообщение успешно отправлено']);
    }

    public function cancel(Operation $operation)
    {
        $this->checkOperation($operation);
        $operation->cancelOperation();
        return redirect()->route('operations.index')->with(['success' => 'Операция успещно отменена']);
    }

    private function checkOperation(Operation $operation)
    {
        if (auth()->user()->exchanger->id != $operation->exchanger_id ||
            $operation->status !== Operation::STATUS_CHECKING) {
            abort(404);
        }
    }
}
