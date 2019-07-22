<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('classrooms', 'ClassroomController');
Route::apiResource('careers', 'CareerController');
Route::apiResource('subjects', 'SubjectController');
Route::apiResource('careersubjects', 'CarrersubjectController');
Route::apiResource('subjectsfromcareer', 'SubjectsfromcareerController');
Route::apiResource('teachers', 'TeacherController');
Route::apiResource('semesters', 'SemesterController');
Route::apiResource('users', 'UserController');

Route::apiResource('lessons', 'LessonController');
Route::get('lessons/{id_semester}/{id_career}', 'LessonController@show');
Route::get('lessons/{id_semester}/teacher/{id_teacher}', 'LessonController@showScheduleTeacher');
Route::get('lessons/{id_semester}/classroom/{id_classroom}', 'LessonController@showScheduleClassRoom');
Route::delete(
    'lessons/{id_classroom}/{id_career_subject}/{id_semester}/{id_teacher}',
    'LessonController@destroy'
);
