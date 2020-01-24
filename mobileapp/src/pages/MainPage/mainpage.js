import React, { Component } from 'react'
import { Text, View } from 'react-native'

import {createStackNavigator} from 'react-navigation'


// pages : 
import { PoetList } from '../poetlist'
import { Poet } from '../poet'
import { Book } from '../book'
import { Chapter } from '../chapter'
import { Poem } from '../poem'
import { Verse } from '../verse'
const MainStack = createStackNavigator({
	PoetList , 
	Poet,
	Book,
	Chapter,
	Poem,
	Verse
} , { 
	headerMode : 'none'
})


export default MainStack
