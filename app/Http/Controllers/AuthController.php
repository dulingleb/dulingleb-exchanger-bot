<?php

namespace App\Http\Controllers;
use App\Models\Operation;
use App\Models\TelegramUserSetting;
use Carbon\Carbon;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (! $token = auth()->attempt($request->only(['email', 'password']))) {
            return $this->responseError('Unauthorized', null, 401);
        }

        return $this->createNewToken($token);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $this->validate($request, [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);

        $user = User::create(array_merge(
                    $request->only(['name', 'email']),
                    ['password' => bcrypt($request->password)]
                ));


        return $this->response($user, 'User successfully registered');
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();

        return $this->response(null, 'User successfully signed out');
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        $user = auth()->user()->toArray();
        $n['operations_wait'] = Operation::where('exchanger_id', auth()->user()->exchanger->id)->where('status', Operation::STATUS_WAIT)->count();
        $n['operations_sum_today'] = Operation::where('exchanger_id', auth()->user()->exchanger->id)->where('status', Operation::STATUS_SUCCESS)->where('updated_at', Carbon::now()->format('Y-m-d'))->sum('price');
        $n['operations_count_today'] = Operation::where('exchanger_id', auth()->user()->exchanger->id)->where('status', Operation::STATUS_SUCCESS)->where('updated_at', Carbon::now()->format('Y-m-d'))->count();
        $n['users_count_today'] = TelegramUserSetting::where('exchanger_id', \auth()->user()->exchanger->id)->where('created_at', Carbon::now()->format('Y-m-d'))->count();
        $data = array_merge($user, $n);
        return $this->response($data);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return $this->response([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

}
