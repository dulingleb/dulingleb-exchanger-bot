<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;

class SuperAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->user() && !$request->user()->isSuperAdmin()) {
            return redirect()->route('login')->withErrors(['unauthorized' => 'У вас недостаточно прав для просмотра этой страницы. Необходимо авторизоваться.']);
        }

        return $next($request);
    }
}
