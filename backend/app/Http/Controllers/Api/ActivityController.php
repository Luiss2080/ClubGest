<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreActivityRequest;
use App\Services\ActivityService;
use Illuminate\Http\JsonResponse;
use Exception;

class ActivityController extends Controller
{
    private ActivityService $activityService;

    public function __construct(ActivityService $activityService)
    {
        $this->activityService = $activityService;
    }

    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $this->activityService->getUpcomingActivities()
        ], 200);
    }

    public function store(StoreActivityRequest $request): JsonResponse
    {
        try {
            $activity = $this->activityService->createActivity($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Actividad agendada con éxito.',
                'data' => $activity
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
