<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function validate(
        Request $request,
        array $rules,
        array $messages = [],
        array $customAttributes = [])
    {
        $validator = $this->getValidationFactory()
            ->make(
                $request->all(),
                $rules, $messages,
                $customAttributes
            );
        if ($validator->fails()) {
            $errors = (new \Illuminate\Validation\ValidationException($validator))->errors();
            throw new \Illuminate\Http\Exceptions\HttpResponseException(response()->json(
                [
                    'status' => false,
                    'message' => "Some fields are missing!",
                    'error_code' => 1,
                    'errors' => $errors
                ], \Illuminate\Http\JsonResponse::HTTP_UNPROCESSABLE_ENTITY));
        }
    }

    public function response($data, string $message = null, int $code = 200): \Illuminate\Http\JsonResponse
    {

        $json = ['status' => $code == 200, 'data' => $data];
        if ($message) {
            $json['message'] = $message;
        }
        return response()->json($json, $code, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }

    public function responseError($message, $errors = null, $code = 422): \Illuminate\Http\JsonResponse
    {
        $json = ['status' => false, 'message' => $message];
        if ($errors) {
            $json['errors'] = $errors;
        }
        return response()->json($json, $code, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }
}
