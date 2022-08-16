<?php

namespace App\Http\Controllers;

use App\CustomGuides;
use Illuminate\Http\Request;

class CustomGuidesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $wave = $request->wave;
        $guideId = $request->guideId;

        // $newWave = CustomGuides::create([
        //     'custom_guides_headers_id' => $guideId,
        //     'camp' => $wave['camp'],
        //     'camp_notes' => "hello"
        // ]);

        // $newWave = new CustomGuides;
        $newWave = CustomGuides::firstOrNew(['id' => $wave['id']]);
        $newWave->custom_guides_headers_id = $guideId;
        $newWave->camp = $wave['camp'];
        $newWave->wave = $wave['wave'];
        $newWave->camp_notes = $wave['camp_notes'];
        $newWave->wave_notes = $wave['general'];
        $newWave->general = $wave['general'];
        $newWave->generals_id = $wave['generals_id'];
        $newWave->troops = json_encode($wave['troops']);
        $newWave->save();

        return $newWave;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CustomGuides  $customGuides
     * @return \Illuminate\Http\Response
     */
    public function show(CustomGuides $customGuides)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CustomGuides  $customGuides
     * @return \Illuminate\Http\Response
     */
    public function edit(CustomGuides $customGuides)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CustomGuides  $customGuides
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CustomGuides $customGuides)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CustomGuides  $customGuides
     * @return \Illuminate\Http\Response
     */
    public function destroy(CustomGuides $customGuides, $id)
    {
        // $customGuides->delete();
        CustomGuides::destroy($id);
        return "hmmm did it work";
    }
}
