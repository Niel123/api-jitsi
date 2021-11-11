<?php

namespace App\Http\Controllers;

use App\Students;
use Illuminate\Http\Request;
use DB;
use Auth;

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
