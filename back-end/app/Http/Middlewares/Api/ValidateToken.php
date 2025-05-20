<?php

namespace App\Http\Middlewares\Api;

use App\Http\Traits\Api\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class ValidateToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    use ApiResponse;
    public function handle(Request $request, Closure $next)

    {

        $sessionData = $request->session()->get("user_id");
        if (!$request->session()->get("user_id")) {
            return   $this->successResponse(
                "Authenfication fail ",
                401,
                $sessionData
            );
        }

        // Update last activity timestamp
        $request->session()->put('last_activity', now());

        return $next($request);
    }
}
