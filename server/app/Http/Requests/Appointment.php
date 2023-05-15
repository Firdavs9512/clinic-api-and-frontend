<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Appointment extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "doctor" => 'required|exists:doctors,id',
            "date" => 'required|date|after_or_equal:today',
            "time" => 'required|date_format:H:i',
        ];
    }
}
