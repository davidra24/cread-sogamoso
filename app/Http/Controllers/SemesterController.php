<?php

namespace App\Http\Controllers;

use App\Semester;
use Illuminate\Http\Request;

class SemesterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $semester;
    public function __construct(Semester $semester)
    {
        $this->semester = $semester;
    }
    public function index()
    {
        $semesters = $this->semester::all();

        return response()->json($semesters);
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
        $semesters=Semester::all();

        $semester=Semester::where('title',$request->title)->first();
        if($semester==null){
            if($semesters->isEmpty()){

                $semesterC=Semester::create($request->all());
                $semesterC->save();
                return response()->json($semesterC);
            }
            else{

                foreach($semesters as $s){
                    
                    if($s->enable==true){
                        $s->enable=false;
                        $s->save();
                    }
                    
                    
                }
                $semesterC=Semester::create($request->all());
                $semesterC->save();
                return response()->json($semesterC);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Semester  $semester
     * @return \Illuminate\Http\Response
     */
    public function show($semester)
    {
        $data = Semester::find($semester);
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Semester  $semester
     * @return \Illuminate\Http\Response
     */
    public function edit(Semester $semester)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Semester  $semester
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $semester)
    {
        $data = Semester::find($semester);
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
     * @param  \App\Semester  $semester
     * @return \Illuminate\Http\Response
     */
    public function destroy(Semester $semester)
    {
        //
    }
}
