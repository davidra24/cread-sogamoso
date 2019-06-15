<?php

namespace App\Http\Controllers;

use App\Lesson;
use Illuminate\Http\Request;

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
        
        $lesson=Lesson::create($request->all());
        $lesson->save();
        return response()->json($lesson);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function show($lesson)
    {
        $data=Lesson::find($lesson);
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
        $data = Lesson::find($lesson);
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
     * @param  \App\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function destroy($lesson)
    {
        $data = Lesson::find($lesson);
        
    }
}
