<?php

namespace App\Http\Controllers;

use App\Carrersubject;
use Illuminate\Http\Request;

class CarrersubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $carreS;
    public function __construct(Carrersubject $carreS)
    {
        $this->carreS = $carreS;
    }
    public function index()
    {
        $carreSs = $this->carreS::all();

        return response()->json($carreSs);
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
        $carrS = Carrersubject::create($request->all());
        $carrS->save();
        return response()->json($carrS);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Carrersubject  $carrersubject
     * @return \Illuminate\Http\Response
     */
    public function show($carrersubject)
    {
        $carrS = Carrersubject::find($carrersubject);
        return response()->json($carrS);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Carrersubject  $carrersubject
     * @return \Illuminate\Http\Response
     */
    public function edit(Carrersubject $carrersubject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Carrersubject  $carrersubject
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $carrersubject)
    {
        $data = Carrersubject::find($carrersubject);
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
     * @param  \App\Carrersubject  $carrersubject
     * @return \Illuminate\Http\Response
     */
    public function destroy($carrersubject)
    {
        $data = Carrersubject::where('id',$carrersubject)->first();
        if($data==null){
        
        }
        else{
        //$data->carrerSubject()->delete();
        $data->delete();
        }
    }
}
