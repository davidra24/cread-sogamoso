<?php

namespace App\Http\Controllers;

use App\Lesson;
use App\ViewLesson;
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
        $contFalse = 0;
        $create = true;
        $id_classroom = $request->id_classroom;
        $id_career_subject = $request->id_career_subject;
        $id_semester = $request->id_semester;
        $id_teacher = $request->id_teacher;
        //$schedule = json_decode(json_encode($request->schedule), true);

        //dd($hours['start_h']);
        $start_h = $request->start_hour;
        $end_h = $request->end_hour;
        $start_h = strtotime($start_h);
        $start_h = date('H:i', $start_h);
        $end_h = strtotime($end_h);
        $end_h = date('H:i', $end_h);

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
            } else {
                //dd('salon desocupado, profesor no');
                $resp = $this->enableTeacher(
                    $teacher_semester,
                    $start_h,
                    $end_h
                );
                $decode = (array) json_decode($resp);
                $contFalse = $decode['contador'];

                if ($contFalse == 0) {
                    $less = Lesson::create($request->all());
                    $less->save();
                    return response()->json($less);
                } else {
                    return response()->json([
                        'mensaje' =>
                            'El horario del docente se cruza con el horario a asignar ',
                        'horario' => $decode['horarioDocente']
                    ]);
                    //dd('no se creo');
                }
            }
        } else {
            //dd("salon ocupado");

            /** si ya se ha asignado el salon en ese año, hay que verificar que no se crucen las horas**/

            $respT = $this->enableTeacher($teacher_semester, $start_h, $end_h);
            $respC = $this->enableClassRoom($class_semester, $start_h, $end_h);
            $decodeRespT = (array) json_decode($respT);
            $decodeRespC = (array) json_decode($respC);

            $cEnableC = $decodeRespC['contador'];
            $cEnableT = $decodeRespT['contador'];

            $contFalse = $cEnableC + $cEnableT;

            if ($contFalse == 0) {
                $less = Lesson::create($request->all());
                $less->save();
                return response()->json($less);
            } elseif ($cEnableC >= 1 && $cEnableT >= 1) {
                return response()->json([
                    'mensaje' =>
                        'El horario del docente y el salón se cruza con el horario a asignar '
                ]);
            } elseif ($cEnableC >= 1) {
                return response()->json([
                    'mensaje' =>
                        'El horario del salón se cruza con el horario a asignar '
                ]);
            } else {
                return response()->json([
                    'mensaje' =>
                        'El horario del docente se cruza con el horario a asignar '
                ]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function enableTeacher($teacher_semester, $start_h, $end_h)
    {
        $cntFalse = 0;
        $horariosDocente = [];
        foreach ($teacher_semester as $classt) {
            $ClassT_start = $classt->start_hour;
            $ClassT_end = $classt->end_hour;

            $ClassT_start = strtotime($ClassT_start);
            $ClassT_start = date('H:i', $ClassT_start);
            $ClassT_end = strtotime($ClassT_end);
            $ClassT_end = date('H:i', $ClassT_end);
            if ($ClassT_start == $start_h && $ClassT_end == $end_h) {
                array_push($horariosDocente, $classt);
                $cntFalse += 1;
            } elseif ($start_h >= $ClassT_end || $end_h <= $ClassT_start) {
            } else {
                array_push($horariosDocente, $classt);
                $cntFalse += 1;
            }
        }
        $data = json_encode([
            'contador' => $cntFalse,
            'horarioDocente' => $horariosDocente
        ]);
        return $data;
    }
    public function enableClassRoom($class_semester, $start_h, $end_h)
    {
        $contFalseC = 0;
        $horariosSalon = [];
        foreach ($class_semester as $classr) {
            //dd($classr->schedule);
            /**$a=$classr->schedule;
            $a=(array) $a;
            $arrayH=implode (",",$a); */

            $ClassR_start = $classr->start_hour;
            $ClassR_end = $classr->end_hour;

            $ClassR_start = strtotime($ClassR_start);
            $ClassR_start = date('H:i', $ClassR_start);
            $ClassR_end = strtotime($ClassR_end);
            $ClassR_end = date('H:i', $ClassR_end);
            if ($ClassR_start == $start_h && $ClassR_end == $end_h) {
                array_push($horariosSalon, $classr);
                $contFalseC += 1;
            } elseif ($start_h >= $ClassR_end || $end_h <= $ClassR_start) {
            } else {
                array_push($horariosSalon, $classr);
                $contFalseC += 1;
            }
        }
        $data = json_encode([
            'contador' => $contFalseC,
            'horarioSalon' => $horariosSalon
        ]);
        return $data;
    }
    public function show(Request $request)
    {
        /*$data = Lesson::find($lesson);
         return response()->json($data);*/
        $data = ViewLesson::where('id_semester', $request->id_semester)
            ->where('id_career', $request->id_career)
            ->get();
        $array = array();
        foreach ($data as $t) {
            $array[] = $t;
        }
        return response()->json($array);
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
