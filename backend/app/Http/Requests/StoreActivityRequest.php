<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'project_id' => 'required|exists:projects,id',
            'name' => 'required|string|max:200',
            'scheduled_at' => 'required|date|after:today',
            'location' => 'nullable|string|max:255',
            'type' => 'required|in:fundraising,social_impact,other',
            'status' => 'nullable|in:planned,in_progress,finished,cancelled'
        ];
    }
}
