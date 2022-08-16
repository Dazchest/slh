<?php

namespace App\Http\Controllers;

use App\CustomGuides;
use App\CustomGuidesHeader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CustomGuidesHeaderController extends Controller
{
    //storage_path('app/public/troops.xlsx')
    public function importHeaders() {
        // $guideHeaders = file_get_contents('./resources/js/components/CustomGuides/cgdetails.json');
        $guideHeaders = file_get_contents('./resources/js/components/CustomGuides/cgheader.json');
        $g = json_decode($guideHeaders);
        // dd($g);
        // $e = json_encode($g);
        // dd($g[0]);
        // $guideHeader = CustomGuidesHeader::all();
        foreach ($g as $key => $value) {
            if($value->UserId != "null") {
                $id = $value->id;
                $header = CustomGuidesHeader::firstOrNew(['id'=>$id]);
                $header->users_id = $value->UserId;
                $header->name = $value->AddyName;
                $header->addy_id = null;
                $header->image = $value->Image;
                $header->wiki_link = "";
                $header->shared = $value->Shared;
                $header->type = "";
                $header->save();
            }
        }
        $guide = file_get_contents('./resources/js/components/CustomGuides/cgdetails.json');
        $g = json_decode($guide);
        // dd($g);

        foreach ($g as $key => $value) {
            // if($value->UserId != "null") {
                $id = $value->id;
                $details = CustomGuides::firstOrNew(['id'=>$id]);
                
                $details->custom_guides_headers_id = $value->AddyId;
                $details->guide_notes = $value->AddyNotes;
                $details->camp = $value->Camp;
                $details->wave = $value->Wave;
                $details->camp_notes = $value->CampNotes;
                $details->wave_notes = $value->WaveNotes;
                $details->general = $value->General;
                $details->generals_id = null;
                $details->troops =  $value->Troops;
                $details->save();
            // }
        }



        // dd($guideHeader);
        return "guides";
    }

    public function buildGuide() {
        $guide = [];
        $guide['id'] = 1;
        $guide['waves'] = [];
        array_push($guide['waves'], []);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $guide = CustomGuidesHeader::where('id', '=', $id)->get()->ToArray();
        // \Log::debug($guide[0]);
        if($guide[0]['image'] == null) {
            $guide[0]['image'] = "";
        }
        $waves = CustomGuides::where('custom_guides_headers_id', '=', $id)->orderBy('camp')->orderBy('wave')->get()->ToArray();
        // dd($d);
        // dd($guide['name']);
        foreach ($waves as $key => $value) {
            $waves[$key]['troops'] = json_decode($waves[$key]['troops']);
            // \Log::debug($waves[$key]['troops'][0]->troopType);
            foreach ($waves[$key]['troops'] as $tkey => $value) {
                // \Log::debug($waves[$key]['troops'][$tkey]['troopType']);
                // \Log::debug($value->troopType);
                // \Log::debug($value->troopQty);
                // \Log::debug($value->troopLoss);
                if($value->troopType == null) {
                    $value->troopType = "";
                }
                $value->troopQty = $value->troopQty != null ? $value->troopQty : 0;
                if(property_exists($value, 'troopLoss')) {
                    $value->troopLoss = $value->troopLoss != null ? $value->troopLoss : 0;
                } else {
                    $value->troopLoss = 0;
                }
            }
            // if($waves[$key]['troops'][0]['troopLoss'])
            // \Log::debug($waves[$key]['troops'][0]['troopLoss']);
            
        }
        $guide[0]['waves'] = $waves;
        // dd($guide[0]);
        return json_encode($guide[0]);
    }
    //$accounts = Account::where('user_id', '=', Auth::user()->id)->orderBy('id')->get();

    public function loadGuideList($type) {
        if($type != "shared") {
            $guideList = CustomGuidesHeader::where('userId', '=', Auth::user()->id)->orderBy('id')->get();
        } else {
            // $guideList = CustomGuidesHeader::where('shared', '=', 1)->where('userId', '!=', Auth::user()->id)->orderBy('id')->get();
            $guideList = CustomGuidesHeader::where('shared', '=', 1)->orderBy('id')->get();
        }
        return $guideList;
    }
    // public function loadSharedGuideList() {
    //     $guideList = CustomGuidesHeader::where('shared', '=', 1)->where('userId', '!=', Auth::user()->id)->orderBy('id')->get();
    //     return $guideList;
    // }

    public function testRel() {
        $guide = CustomGuidesHeader::where('id', 1);

        $guideHeader = $guide->get()->toArray();
        $guideHeader = $guideHeader[0];

        $guide = CustomGuidesHeader::find(1);
        $waves = $guide->details()->get()->toArray();

        $loadGuide = [];
        $loadGuide['waves'] = $waves;
        $newg = $loadGuide + $guideHeader;
        // dd($newg);
        return json_encode($newg);
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
        // return $name;
    }

    public function savename(Request $request)
    {
        $guide = CustomGuidesHeader::find($request->id);
        $guide->name = $request->name;
        $guide->save();
        // \Log::debug($guide);
        return $request;
    }

    public function saveinfo(Request $request)
    {
        $guide = CustomGuidesHeader::find($request->id);
            // Log::debug('An inforessage.');
            if(Auth::user()->id == $guide->userid) {
            $guide->name = $request->name;
            $guide->image = $request->image;
            $guide->image_name = $this->grab_image($request->image);
            $guide->notes = $request->notes ? $request->notes : "";
            $guide->wiki_link = $request->wiki_link ? $request->wiki_link : "";
            $guide->save();
        }
        // \Log::debug($guide);
        return $request;
    }
    public function grab_image($url){
        Log::debug('An informational message...');

        $imageInfo = pathinfo($url);
        $name = $imageInfo['basename'];
        $contents = file_get_contents($url);
        // $name = substr($url, strrpos($url, '/') + 1);
        Storage::put($name, $contents);

        return $name;

    }

    public function createNewGuide(Request $request) {
        $guide = new CustomGuidesHeader;
        $guide->userid = Auth::user()->id;
        $guide->save();
        // return "newguide please";
        return $guide;
    }

    public function toggleShareGuide($id) {
        $guide = CustomGuidesHeader::find($id);
        if($guide->shared == true) {
            $guide->shared = false;
        } else {
            $guide->shared = true;
        }
        $guide->save();
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\CustomGuidesHeader  $customGuidesHeader
     * @return \Illuminate\Http\Response
     */
    public function show(CustomGuidesHeader $customGuidesHeader)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CustomGuidesHeader  $customGuidesHeader
     * @return \Illuminate\Http\Response
     */
    public function edit(CustomGuidesHeader $customGuidesHeader)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CustomGuidesHeader  $customGuidesHeader
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CustomGuidesHeader $customGuidesHeader)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CustomGuidesHeader  $customGuidesHeader
     * @return \Illuminate\Http\Response
     */
    public function destroy(CustomGuidesHeader $customGuidesHeader, $id)
    {
        CustomGuidesHeader::destroy($id);
        return "destroy";
    }
}
