<?php

namespace App\Http\Controllers;

use App\Conference;
use App\Attendance;
use Illuminate\Http\Request;
use DB;

class JoinCallController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $conference = Conference::where('conference_name','=',$request->conference_name)->first();
        if(!$conference){
            return response()->json("Room name is not exist", 403);
        }
        //return 'https://jitsi.blue-label.link/'.$request->conference_name.'#userInfo.displayName='.$request->name.'';
        return 'https://127.0.0.1:8080/'.$request->conference_name.'#userInfo.displayName='.$request->name.'';

    }

    public function updateAttendance(Request $request)
    {
        $conference_name =  strtolower(str_replace(' ', '', $request->conference_name)) ;
        $conference = Conference::select("id", "conference_name")
        ->where(DB::raw('lower(conference_name)'), strtolower($conference_name))
        ->first();
        if($conference){
            $attendance_check = Attendance::where('name', '=', $request->participants_name['name'])->where('conference_id',$conference->id)->first();
            if (!$attendance_check) {
                try {
                    $attendance = Attendance::create([ 
                        'conference_id'     =>$conference->id,
                        'name'     =>$request->participants_name['name'],
                    ]);
                    return response()->json([ 'result' => true, 'message' => 'Attendace successully saved!' ], 200);
                } catch (\Exception $e) {
                    return response()->json([ 'result' => false, 'message' => $e->getMessage() ], 400);
                }
            }else{

                try {
                    Attendance::where('name', '=', $request->participants_name['name'])->where('conference_id',$conference->id)->update(['last_attendance'=> date('Y-m-d h:i:s')]);
                    return response()->json([ 'result' => true, 'message' => 'Attendace successully updated!' ], 200);
                } catch (\Exception $e) {
                    return response()->json([ 'result' => false, 'message' => $e->getMessage() ], 400);
                }
            }
        }
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }
}
