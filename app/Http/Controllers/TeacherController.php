<?php

namespace App\Http\Controllers;

use App\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $teacher;
    public function __construct(Teacher $teacher)
    {
        $this->teacher = $teacher;
    }
    public function index()
    {
        $teacher = $this->teacher::all();

        return response()->json($teacher);
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
        $t=Teacher::find($request->id);
        if($t==null){
        $teacher=Teacher::create($request->all());
        $teacher->save();
        return response()->json($teacher);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function show($teacher)
    {
        $teacher=Teacher::find($request->id);
        return response()->json($teacher);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function edit(Teacher $teacher)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $teacher)
    {
        $data = Teacher::find($teacher);
        if ($data == null) {
            return null;
        } else {
            $data->fill($request->all());
            $data->save();
            
            return response()->json($data);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function destroy(Teacher $teacher)
    {
        //
    }
}
