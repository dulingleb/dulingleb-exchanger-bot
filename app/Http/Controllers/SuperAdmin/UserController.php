<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Exchanger;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\QueryBuilderRequest;

class UserController extends Controller
{
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $users = QueryBuilder::for(User::class)
            ->allowedFilters(['name', 'email'])
            ->defaultSort('-id')
            ->allowedSorts('id', 'name', 'email')
            ->jsonPaginate();

        return $this->response($users);
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validate($request, [
            'name' => 'required|min:2|max:198|string',
            'email' => 'required|email|unique:users',
            'subscribe' => 'nullable|date',
            'password' => 'required|min:4|max:32',
            'c_password' => 'required|same:password'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'subscribe' => $request->subscribe ? Carbon::make($request->subscribe)->format('Y-m-d H:i:s') : null
        ]);

        Exchanger::create([
            'user_id' => $user->id,
            'status' => \App\Models\Exchanger::STATUS_CLOSED,
            'course' => 40000,
            'min_exchange' => '0.001',
            'max_exchange' => '0.1'
        ]);

        return $this->response($user, 'Пользователь успешно добавлен');
    }

    public function show(User $user): \Illuminate\Http\JsonResponse
    {
        return $this->response($user);
    }

    public function update(Request $request, User $user): \Illuminate\Http\JsonResponse
    {
        $this->validate($request, [
            'name' => 'required|min:2|max:198|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'subscribe' => 'nullable|date',
            'password' => 'nullable|min:4|max:32',
            'c_password' => 'same:password'
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->c_password) {
            $user->password = bcrypt($request->c_password);
        }
        if ($request->subscribe) {
            $user->subscribe = Carbon::make($request->subscribe)->format('Y-m-d H:i:s');
        }
        $user->save();

        return $this->response(null, 'Данные успешно сохранены');
    }

    public function destroy(User $user): \Illuminate\Http\JsonResponse
    {
        if (auth()->id() === $user->id) {
            return $this->responseError('Нельзя удалить самого себя', null, 400);
        }

        $user->delete();

        return $this->response($user, 'Пользователь успешно удален');
    }
}
