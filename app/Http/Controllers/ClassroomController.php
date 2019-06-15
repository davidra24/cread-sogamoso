<?php

namespace App\Http\Controllers;

use App\Classroom;
use Illuminate\Http\Request;
use App\Lesson;
class ClassroomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $classroom;
    public function __construct(Classroom $classroom)
    {
        $this->classroom = $classroom;
    }
    public function index()
    {
        $classrooms = $this->classroom::all();

        return response()->json($classrooms);
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
        $class=Classroom::where('name',$request->name)->first();
        if($class==null){
        $classroom=Classroom::create($request->all());
        $classroom->save();
        return response()->json($classroom);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function show($classroom)
    {
        $data = Classroom::find($classroom);
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function edit(Classroom $classroom)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $classroom)
    {
        $data = Classroom::find($classroom);
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
     * @param  \App\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function destroy($classroom)
    {
        $data = Classroom::find($classroom);
        //$id=$data->i
        //$data->lesson()->detach($data->);
    }
}
