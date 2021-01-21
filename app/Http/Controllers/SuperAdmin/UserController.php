<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Exchanger;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\QueryBuilderRequest;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = QueryBuilder::for(User::class)
            ->allowedFilters(['name', 'email'])
            ->defaultSort('-id')
            ->allowedSorts('id', 'name', 'email')
            ->jsonPaginate($request->perPage ?? Config::get('default_size', '10'));

        return response()->json($users);
    }

    public function create()
    {
        return view('users.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:2|max:198|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:4|max:32',
            'c_password' => 'required|same:password'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        Exchanger::create([
            'user_id' => $user->id,
            'status' => \App\Models\Exchanger::STATUS_CLOSED,
            'course' => 40000,
            'min_exchange' => '0.001',
            'max_exchange' => '0.1',
        ]);

        return response()->json(['status' => true, 'message' => 'Пользователь успешно добавлен']);
    }

    public function show(User $user)
    {
        return response()->json(['status' => true, 'data' => $user]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|min:2|max:198|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:4|max:32',
            'c_password' => 'same:password'
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->c_password) {
            $user->password = bcrypt($request->c_password);
        }
        $user->save();

        return response()->json(['status' => true, 'message' => 'Данные успешно сохранены']);
    }

    public function destroy(User $user)
    {
        if (auth()->id() === $user->id) {
            return response()->json(['status' => false, 'message' => 'Нельзя удалить самого себя'])->setStatusCode(400);
        }

        $user->delete();

        return response()->json(['status' => true, 'message' => 'Пользователь успешно удален']);
    }
}
