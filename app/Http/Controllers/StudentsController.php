<?php

namespace App\Http\Controllers;

use App\Students;
use App\Conference;
use App\AttendanceLog;
use Illuminate\Http\Request;
use DB;
use Auth;
use Carbon\Carbon;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $pageno = $request->page;
        $no_of_records_per_page = $request->per_page;
        $offset = ($pageno-1) * $no_of_records_per_page;
        $search = $request->search;
        $search_query = '';
        if($search !=''){
            $search_query=  "WHERE    CONCAT_ws('-', first_name, middle_name) LIKE '%{$search}%'";
        }
        
        $list  = DB::select('SELECT *  FROM  students '. $search_query.' LIMIT '.$offset.', '.$no_of_records_per_page.' ');
        $total_rows = DB::select('SELECT COUNT(*) AS total FROM  students  '. $search_query.' ');
        $total_pages  = ceil($total_rows[0]->total);
        $return = array(
            'total'         => $total_pages,
            'per_page'      => $no_of_records_per_page,
            'page'          => $pageno,
            'data'          => $list,
        );
        return response()->json($return, 200);
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
        try {
            $student = Students::create([ 
                'first_name'       =>$request->first_name,
                'last_name'        =>$request->last_name,
                'middle_name'      =>$request->middle_name,
                'org_id'           =>Auth::user()->org_id,
            ]);
            DB::commit();
            return response()->json([ 'result' => true,  'student' => $student, 'message' => 'Student successully saved!' ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([ 'result' => false, 'message' => $e->getMessage() ], 400);
        }
    }

    public function studentListUpdate(Request $request) {
        $conference_data = Conference::where('conference_name', $request->roomName)
            ->whereDate('created_at', Carbon::today());
        if($conference_data->count() > 0) {
            $conf_data = $conference_data->first();

            $log = new AttendanceLog;
            $log->conference_id = $conf_data->id;
            $log->date_id = $request->uuid;
            $log->students_json = json_encode($request->studentList);
            $log->room_name = $request->roomName;
            $log->save();

            return $log;

        } else {
            return response()->json([ 'fail' => true, 'err' => 'room does not exist' ]); 
        }
    }

    public function getStudentLogs(Request $request) {
        return AttendanceLog::where('conference_id', $request->id)->get();
        // return $log;
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
