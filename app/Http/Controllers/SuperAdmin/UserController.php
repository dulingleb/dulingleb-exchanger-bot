<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Exchanger;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return view('users.index', compact('users'));
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

        return redirect()->route('user.index')->with(['success' => 'Пользователь успешно добавлен']);
    }

    public function edit(User $user)
    {
        return view('users.edit', compact('user'));
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

        return redirect()->route('user.edit', $user)->with(['success' => 'Данные успешно сохранены!']);
    }

    public function destroy(User $user)
    {
        if (auth()->id() === $user->id) {
            return redirect()->route('user.index')->withErrors(['Нельзя удалить самого себя']);
        }

        $user->delete();

        return redirect()->route('user.index')->with(['success' => 'Пользователь успещно удален']);
    }
}
