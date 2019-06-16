<?php

namespace App\Http\Controllers;

use App\Lesson;
use Illuminate\Http\Request;
use DB;
class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $lesson;
    public function __construct(Lesson $lesson)
    {
        $this->lesson = $lesson;
    }
    public function index()
    {
        $lessons = $this->lesson::all();

        return response()->json($lessons);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $create = true;
        $id_classroom = $request->id_classroom;
        $id_career_subject = $request->id_career_subject;
        $id_semester = $request->id_semester;
        $id_teacher = $request->id_teacher;
        $schedule = $request->schedule;

        $class_semester = Lesson::where('id_classroom', '=', $id_classroom)
            ->where('id_semester', '=', $id_semester)
            ->get();
        $teacher_semester = Lesson::where('id_teacher', '=', $id_teacher)
            ->where('id_semester', '=', $id_semester)
            ->get();
        /** if verifica salones disponibles en ese año */
        if ($class_semester->isEmpty()) {
            if ($teacher_semester->isEmpty()) {
                /** se asigna el salon y profesor */
                $lesson = Lesson::create($request->all());
                $lesson->save();
                return response()->json($lesson);
            }
        } else {
            /** si ya se ha asignado el salon en ese año, hay que verificar que no se crucen las horas**/

            $hours = json_decode(json_encode($schedule), true);
            //dd($hours['start_h']);
            $start_h = $hours['start_h'];
            $end_h = $hours['end_h'];
            $start_h = strtotime($start_h);
            $start_h = date('H:i', $start_h);
            $end_h = strtotime($end_h);
            $end_h = date('H:i', $end_h);

            foreach ($class_semester as $classr) {
                $classR_H = (array) json_decode(json_encode($classr->schedule));

                $ClassR_start = $classR_H['start_h'];
                $ClassR_end = $classR_H['end_h'];

                $ClassR_start = strtotime($ClassR_start);
                $ClassR_start = date('H:i', $ClassR_start);
                $ClassR_end = strtotime($ClassR_end);
                $ClassR_end = date('H:i', $ClassR_end);
                if ($ClassR_start == $start_h && $ClassR_end == $end_h) {
                    $create = false;
                    return response()->json($classr);
                } elseif ($start_h >= $ClassR_end || $end_h <= $ClassR_start) {
                    $create = true;
                } else {
                    $create = false;
                    return response()->json($classr);
                }
            }

            foreach ($teacher_semester as $classt) {
                $teacher_H = (array) json_decode(
                    json_encode($classt->schedule)
                );

                $ClassT_start = $teacher_H['start_h'];
                $ClassT_end = $teacher_H['end_h'];

                $ClassT_start = strtotime($ClassR_start);
                $ClassT_start = date('H:i', $ClassR_start);
                $ClassT_end = strtotime($ClassR_end);
                $ClassT_end = date('H:i', $ClassR_end);
                if ($ClassT_start == $start_h && $ClassT_end == $end_h) {
                    $create = false;
                    return response()->json($classr);
                } elseif ($start_h >= $ClassT_end || $end_h <= $ClassT_start) {
                    $create = true;
                } else {
                    $create = false;
                    return response()->json($classt);
                }
                if ($create === true) {
                    $lesson = Lesson::create($request->all());
                    $lesson->save();
                    return response()->json($lesson);
                }
            }

            /**$teacher_H=(array) json_decode($teacher_semester->schedule);           
            $ClassT_start=$teacher_H['start_h'];
            $ClassT_end=$teacher_H['end_h'];
            **/
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function show($lesson)
    {
        $data = Lesson::find($lesson);
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function edit($lesson)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $lesson)
    {
        /**$data = Lesson::find($lesson);
        if ($data == null) {
            return null;
        } else {
            $data->fill($request->all());
            $data->save();
            
            return response()->json($data);
        }**/
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $data = Lesson::where('id_classroom', $request->id_classroom)
            ->where('id_career_subject', $request->id_career_subject)
            ->where('id_semester', $request->id_semester)
            ->where('id_teacher', $request->id_teacher)
            ->first();

        /**$data->classroom()->detach($request->id_classroom);
        $data->semester()->detach($request->id_semester);
        $data->teacher()->detach($request->id_teacher);
        $data->carrersubject()->detach($request->id_career_subject);**/

        $data->delete();
    }
}
