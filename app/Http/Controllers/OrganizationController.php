<?php

namespace App\Http\Controllers;

use App\Organizations;
use Illuminate\Http\Request;
use DB;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //return 'https://jitsi.blue-label.link/xavier-con#userInfo.displayName="Niel Daculan"';
        $pageno = $request->page;
        $no_of_records_per_page = $request->per_page;
        $offset = ($pageno-1) * $no_of_records_per_page;
        $search = $request->search;
        $search_query = '';
        if($search !=''){
            $search_query=  "WHERE    CONCAT_ws('-', org_name, org_address) LIKE '%{$search}%'";
        }
        
        $list  = DB::select('SELECT *  FROM  organizations '. $search_query.' LIMIT '.$offset.', '.$no_of_records_per_page.' ');
        $total_rows = DB::select('SELECT COUNT(*) AS total FROM  organizations  '. $search_query.' ');
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
        // /Organizations
        try {
            $organization = Organizations::create([ 
                'org_name'     =>$request->org_name,
                'slug'     =>$request->org_name,
                'org_address'   =>$request->org_address,
            ]);
            DB::commit();
            return response()->json([ 'result' => true,  'organization' => $organization, 'message' => 'Organization successully saved!' ], 200);
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
